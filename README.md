<div align=center>
<img src="https://raw.githubusercontent.com/jgsneves/goStackModulo1Backend/master/gostack_rocketseat.png" />
</div>

# Back-end com NodeJS e Typescript

Este repositório tem o objetivo de consolidar o conhecimento adquirido na aula "Back-end com NodeJS e Typescript" do Módulo 02 do bootcamp GoStack da Rocketseat


## :memo: O que é este repo?

Basicamente é uma API escrita em NodeJS e Typescript em que exploramos os principais conceitos do SOLID, especialmente o Soc (Separation of Concerns) e o Dependency Inversion,
com a criação de Service e Repository de uma funcionalidade de agendamento, que possui o seguinte data design:

```js
appointment = {
	"id": hash uuidv4(),
	"provider": "que é um prestador de serviço",
	"date": "a data e a hora da prestação do serviço"
}
```
Este appointment faz parte da aplicação como um todo, que é um software de gerenciamento de agendamentos de vários barbeiros. Neste back-end implementamos duas funcionalidades:

### 1) Service:

O service é um módulo responsável pelo tratamento do dado recebido pela rota e sua request, devolvendo o dado pronto para a response.
```ts
interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentRepository: AppointmentRepository;

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
```

### 2) Repository:

Seguindo a mesma lógica de deixar a rota livre para realizar suas responsabilidades, o repository se preocupa com a persistência dos dados. Ele realiza todas as operações com os dados antes de realizar operações no banco de dados, deixando a rota com a responsabilidade exclusiva de gerenciar as HTTP requests e devolver suas respectivas responses.

```ts

interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public all(): Appointment[] {
        return this.appointments;
    }

    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date });

        this.appointments.push(appointment);

        return appointment;
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
        );

        return findAppointment || null;
    }
}
```


## :computer: Tecnologias empregadas:
- [Express](https://expressjs.com/);
- [Uuidv4 - gerador de hash aleatória](https://www.npmjs.com/package/uuidv4);
- [Node](https://nodejs.org/en/);
- [Nodemon](https://nodemon.io/);
- [TypeScript](https://www.typescriptlang.org/);

## :nerd_face: Competências adquiridas:
- Responsabilidade da Rota;
- Conceitos de SOLID;
- Responsabilidade do Repository;
- Responsabilidade do Service;
- Conceito de Data Trafic Object;
