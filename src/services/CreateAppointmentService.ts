import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentRepository: AppointmentRepository;

    // todo service tem um único método
    constructor(appointmentRepository: AppointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public execute({ provider, date }: Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        const appointment = this.appointmentRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
