import requests
import sys
import json
from datetime import datetime, timedelta

class RestaurantAPITester:
    def __init__(self, base_url="https://toulousedining.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            self.test_results.append({
                'name': name,
                'method': method,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': response.status_code,
                'success': success,
                'response_preview': response.text[:200] if not success else "OK"
            })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                'name': name,
                'method': method,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': 'ERROR',
                'success': False,
                'response_preview': str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_get_menu(self):
        """Test menu endpoint"""
        success, response = self.run_test("Get Menu", "GET", "menu", 200)
        if success:
            # Verify menu structure
            expected_categories = ['entrees', 'plats', 'desserts', 'boissons']
            for category in expected_categories:
                if category not in response:
                    print(f"❌ Missing category: {category}")
                    return False
                if not isinstance(response[category], list):
                    print(f"❌ Category {category} is not a list")
                    return False
                if len(response[category]) == 0:
                    print(f"❌ Category {category} is empty")
                    return False
            print("✅ Menu structure validated")
        return success

    def test_get_reviews(self):
        """Test reviews endpoint"""
        success, response = self.run_test("Get Reviews", "GET", "reviews", 200)
        if success:
            # Verify reviews structure
            if not isinstance(response, list):
                print("❌ Reviews response is not a list")
                return False
            if len(response) == 0:
                print("❌ No reviews found")
                return False
            
            # Check for required review fields
            for review in response[:2]:  # Check first 2 reviews
                required_fields = ['id', 'author', 'text', 'rating']
                for field in required_fields:
                    if field not in review:
                        print(f"❌ Missing field {field} in review")
                        return False
            
            # Check for specific reviewers mentioned in requirements
            authors = [review['author'] for review in response]
            if 'Noémie Asfaux' not in authors:
                print("❌ Missing review from Noémie Asfaux")
                return False
            if 'Antoine S' not in authors:
                print("❌ Missing review from Antoine S")
                return False
            
            print("✅ Reviews structure and content validated")
        return success

    def test_get_restaurant_info(self):
        """Test restaurant info endpoint"""
        success, response = self.run_test("Get Restaurant Info", "GET", "info", 200)
        if success:
            # Verify restaurant info structure
            required_fields = ['name', 'phone', 'rating', 'reviews_count', 'address']
            for field in required_fields:
                if field not in response:
                    print(f"❌ Missing field {field} in restaurant info")
                    return False
            
            # Check specific values
            if response['name'] != 'Le Gros Arbre':
                print(f"❌ Wrong restaurant name: {response['name']}")
                return False
            if response['phone'] != '07 65 87 29 34':
                print(f"❌ Wrong phone number: {response['phone']}")
                return False
            if response['rating'] != 4.4:
                print(f"❌ Wrong rating: {response['rating']}")
                return False
            if response['reviews_count'] != 558:
                print(f"❌ Wrong reviews count: {response['reviews_count']}")
                return False
            
            print("✅ Restaurant info validated")
        return success

    def test_create_reservation(self):
        """Test reservation creation"""
        # Get tomorrow's date
        tomorrow = datetime.now() + timedelta(days=1)
        # Make sure it's not Monday (restaurant closed)
        while tomorrow.weekday() == 0:  # Monday is 0
            tomorrow += timedelta(days=1)
        
        reservation_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "0123456789",
            "date": tomorrow.strftime('%Y-%m-%d'),
            "time": "19:30",
            "guests": 2,
            "special_requests": "Test reservation"
        }
        
        success, response = self.run_test(
            "Create Reservation", 
            "POST", 
            "reservations", 
            200, 
            data=reservation_data
        )
        
        if success:
            # Verify response structure
            required_fields = ['id', 'name', 'email', 'phone', 'date', 'time', 'guests', 'status']
            for field in required_fields:
                if field not in response:
                    print(f"❌ Missing field {field} in reservation response")
                    return False, None
            
            # Verify data matches
            if response['name'] != reservation_data['name']:
                print(f"❌ Name mismatch: {response['name']} != {reservation_data['name']}")
                return False, None
            
            print("✅ Reservation creation validated")
            return True, response['id']
        
        return False, None

    def test_get_reservations(self):
        """Test getting all reservations"""
        return self.run_test("Get All Reservations", "GET", "reservations", 200)

    def test_get_reservation_by_id(self, reservation_id):
        """Test getting specific reservation"""
        if not reservation_id:
            print("⚠️  Skipping get reservation by ID - no reservation ID available")
            return True
        
        return self.run_test(
            "Get Reservation by ID", 
            "GET", 
            f"reservations/{reservation_id}", 
            200
        )

    def test_available_times(self):
        """Test available times endpoint"""
        # Get tomorrow's date
        tomorrow = datetime.now() + timedelta(days=1)
        while tomorrow.weekday() == 0:  # Skip Monday
            tomorrow += timedelta(days=1)
        
        success, response = self.run_test(
            "Get Available Times", 
            "GET", 
            "available-times", 
            200,
            params={"date": tomorrow.strftime('%Y-%m-%d')}
        )
        
        if success:
            # Verify response structure
            if 'lunch' not in response or 'dinner' not in response:
                print("❌ Missing lunch or dinner in available times")
                return False
            
            if not isinstance(response['lunch'], list) or not isinstance(response['dinner'], list):
                print("❌ Lunch or dinner times are not lists")
                return False
            
            print("✅ Available times structure validated")
        
        return success

    def test_contact_message(self):
        """Test contact message creation"""
        contact_data = {
            "name": "Test Contact",
            "email": "contact@example.com",
            "message": "Test message from API test"
        }
        
        success, response = self.run_test(
            "Create Contact Message", 
            "POST", 
            "contact", 
            200, 
            data=contact_data
        )
        
        if success:
            # Verify response structure
            required_fields = ['id', 'name', 'email', 'message', 'created_at']
            for field in required_fields:
                if field not in response:
                    print(f"❌ Missing field {field} in contact response")
                    return False
            
            print("✅ Contact message creation validated")
        
        return success

    def test_delete_reservation(self, reservation_id):
        """Test reservation deletion"""
        if not reservation_id:
            print("⚠️  Skipping delete reservation - no reservation ID available")
            return True
        
        return self.run_test(
            "Delete Reservation", 
            "DELETE", 
            f"reservations/{reservation_id}", 
            200
        )

def main():
    print("🍽️  Starting Le Gros Arbre Restaurant API Tests")
    print("=" * 60)
    
    tester = RestaurantAPITester()
    reservation_id = None
    
    # Run all tests
    tests = [
        tester.test_root_endpoint,
        tester.test_get_menu,
        tester.test_get_reviews,
        tester.test_get_restaurant_info,
        tester.test_available_times,
        tester.test_contact_message,
    ]
    
    # Test reservation creation and get the ID
    success, res_id = tester.test_create_reservation()
    if success:
        reservation_id = res_id
    
    # Add reservation-dependent tests
    tests.extend([
        tester.test_get_reservations,
        lambda: tester.test_get_reservation_by_id(reservation_id),
        lambda: tester.test_delete_reservation(reservation_id),
    ])
    
    # Run all tests
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
    
    # Print summary
    print("\n" + "=" * 60)
    print(f"📊 Test Summary:")
    print(f"   Tests run: {tester.tests_run}")
    print(f"   Tests passed: {tester.tests_passed}")
    print(f"   Success rate: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    # Print failed tests
    failed_tests = [test for test in tester.test_results if not test['success']]
    if failed_tests:
        print(f"\n❌ Failed Tests ({len(failed_tests)}):")
        for test in failed_tests:
            print(f"   - {test['name']}: {test['actual_status']} (expected {test['expected_status']})")
            if test['response_preview']:
                print(f"     Response: {test['response_preview']}")
    else:
        print("\n✅ All tests passed!")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())