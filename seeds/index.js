const sequelize = require('../config/connection')

const { User, Event, Attraction, Attendee } = require('../models')

const users = [
    {
        name: "Tester",
        email: "test@test.com",
        password: "password",
    },
    {
        name: "Tester 2",
        email: "test2@test.com",
        password: "password",
    },
]

// Event needs title,location,details,start_date,end_date,admin_id
const events = [
    {
        title: "Test Event",
        location: "Test Location",
        details: "These are test details",
        start_date: 1/1/11,
        end_date: 1/2/11,
        admin_id: 1
    }
]


const attractions = [
    {
        title: "Test Attraction",
        location: "Test Attraction Location",
        details: "Test details",
        start_date: 1/1/11,
        end_date: 1/2/11,
        event_id: 1
    }
]

const attendees = [
    {
        event_id: 1,
        user_id: 2,
        invited_email: 'test2@test.com',
        going: true
    }
]







const feedMeSeedmor = async () => {
    try {
        await sequelize.sync({ force: true })
        await User.bulkCreate(users, {
            individualHooks: true
        }
        );
        await Event.bulkCreate(events);
        await Attraction.bulkCreate(attractions);
        await Attendee.bulkCreate(attendees);
        process.exit(0);

    } catch (err) {
        console.log(err)
    }
}

feedMeSeedmor();