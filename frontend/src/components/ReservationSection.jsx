import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Users, User, Mail, Phone, MessageSquare, Check, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ReservationSection = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [availableTimes, setAvailableTimes] = useState({ lunch: [], dinner: [] });

  const timeSlots = {
    lunch: ['12:00', '12:30', '13:00', '13:30', '14:00'],
    dinner: ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30']
  };

  const fetchAvailableTimes = async (selectedDate) => {
    try {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const response = await axios.get(`${API}/available-times?date=${dateStr}`);
      setAvailableTimes(response.data);
    } catch (error) {
      console.error('Error fetching available times:', error);
      setAvailableTimes(timeSlots);
    }
  };

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setTime('');
    if (selectedDate) {
      fetchAvailableTimes(selectedDate);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!date || !time || !name || !email || !phone) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);

    try {
      const reservationData = {
        name,
        email,
        phone,
        date: format(date, 'yyyy-MM-dd'),
        time,
        guests: parseInt(guests),
        special_requests: specialRequests || null
      };

      await axios.post(`${API}/reservations`, reservationData);
      
      setIsSuccess(true);
      toast.success('Réservation confirmée !');
      
      // Reset form after delay
      setTimeout(() => {
        setIsSuccess(false);
        setDate(null);
        setTime('');
        setGuests('2');
        setName('');
        setEmail('');
        setPhone('');
        setSpecialRequests('');
      }, 3000);
      
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast.error('Erreur lors de la réservation. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const disabledDays = (day) => {
    // Disable past dates and Mondays (restaurant closed)
    const today = startOfDay(new Date());
    return isBefore(day, today) || day.getDay() === 1;
  };

  if (isSuccess) {
    return (
      <section
        id="reservation"
        data-testid="reservation-section"
        className="py-20 md:py-32 bg-bone"
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-cedar rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal mb-4">
            Réservation confirmée !
          </h2>
          <p className="text-muted-foreground text-lg mb-2">
            Merci {name}, nous avons bien reçu votre réservation.
          </p>
          <p className="text-charcoal font-medium">
            {format(date, 'EEEE d MMMM yyyy', { locale: fr })} à {time}
          </p>
          <p className="text-muted-foreground">
            pour {guests} {parseInt(guests) > 1 ? 'personnes' : 'personne'}
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Un email de confirmation a été envoyé à {email}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="reservation"
      data-testid="reservation-section"
      className="py-20 md:py-32 bg-bone"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm uppercase tracking-widest font-semibold text-cedar/60 mb-4 block">
            Réservation
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-charcoal mb-4 text-balance">
            Réservez votre table
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Choisissez votre date et heure de préférence pour une expérience culinaire inoubliable
          </p>
        </motion.div>

        {/* Reservation Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Picker */}
            <div className="space-y-2">
              <Label className="text-charcoal font-medium">Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-testid="reservation-date-picker"
                    className={`w-full justify-start text-left font-normal h-12 ${
                      !date && 'text-muted-foreground'
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP', { locale: fr }) : 'Sélectionner une date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    disabled={disabledDays}
                    initialFocus
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground">Fermé le lundi</p>
            </div>

            {/* Time Selector */}
            <div className="space-y-2">
              <Label className="text-charcoal font-medium">Heure *</Label>
              <Select value={time} onValueChange={setTime} disabled={!date}>
                <SelectTrigger data-testid="reservation-time-select" className="h-12">
                  <SelectValue placeholder="Sélectionner l'heure">
                    {time && (
                      <span className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {time}
                      </span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Déjeuner</div>
                  {(availableTimes.lunch.length > 0 ? availableTimes.lunch : timeSlots.lunch).map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                  <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">Dîner</div>
                  {(availableTimes.dinner.length > 0 ? availableTimes.dinner : timeSlots.dinner).map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <Label className="text-charcoal font-medium">Nombre de personnes *</Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger data-testid="reservation-guests-select" className="h-12">
                  <SelectValue>
                    <span className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      {guests} {parseInt(guests) > 1 ? 'personnes' : 'personne'}
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num > 1 ? 'personnes' : 'personne'}
                    </SelectItem>
                  ))}
                  <SelectItem value="10+">Plus de 10 (nous contacter)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label className="text-charcoal font-medium">Nom *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  data-testid="reservation-name-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="text-charcoal font-medium">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  data-testid="reservation-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label className="text-charcoal font-medium">Téléphone *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  data-testid="reservation-phone-input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="06 12 34 56 78"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2 mt-6">
            <Label className="text-charcoal font-medium">Demandes particulières</Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                data-testid="reservation-special-requests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Allergies, anniversaire, placement préféré..."
                className="pl-10 min-h-[100px] resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            data-testid="reservation-submit-btn"
            disabled={isSubmitting || !date || !time || !name || !email || !phone}
            className="w-full mt-8 bg-cedar hover:bg-cedar-dark text-white rounded-full py-6 text-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Réservation en cours...
              </>
            ) : (
              'Confirmer la réservation'
            )}
          </Button>

          {/* Info */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            Service : Repas sur place uniquement • Menu moyen : 30-40€
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default ReservationSection;
