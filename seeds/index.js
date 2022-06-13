const sequelize = require('../config/connection')

const { User, Event, Attraction, Attendee } = require('../models')

const users = [
    {
        name: "Tester",
        email: "test@test.com",
        password: "password",
    },
    {
        name: "Dap",
        email: "dap@dap.com",
        password: "password",
    },
    {
        name: "Andrew",
        email: "andrew@andrew.com",
        password: "password",
    },
    {
        name: "Jeff",
        email: "jeff@jeff.com",
        password: "password",
    },
    {
        name: "Tyler",
        email: "tyler@tyler.com",
        password: "password",
    },
    {
        name: "Taylor",
        email: "taylor@taylor.com",
        password: "password",
    },
]

// Event needs title,location,details,start_date,end_date,admin_id
const events = [
    {
        title: "Thai Food Bananza",
        location: "Dap's Thai Food Restaurant",
        details: "Come one, come all to Dap's extravagant, family-owned Thai restaurant. Voted #1 ever.",
        start_date: 2022-6-13,
        end_date: 2022-6-13,
        admin_id: 1
    },
    {
        title: "MTG Commander Night",
        location: "Zulus",
        details: "Come down to a fun night of Commander. Food, drink included- serious decks only.",
        start_date: 2022-6-15,
        end_date: 2022-6-15,
        admin_id: 1
    },
    {
        title: "Deep Sea Fishing",
        location: "Strait of Juan de Fuca",
        details: "Hop on a boat, venture out to the sea and 360 no scope some fishies.",
        start_date: 2022-6-16,
        end_date: 2022-6-16,
        admin_id: 1
    }
]


const attractions = [
    {
        title: "Test Attraction",
        location: "Test Attraction Location",
        details: "Test details",
        start_date: 2010-1-19,
        end_date: 2010-1-20,
        event_id: 1
    }
]

const attendees = [
    {
        event_id: 1,
        user_id: 2,
        invited_email: 'test@test.com',
        going: true
    },
    {
        event_id: 2,
        user_id: 2,
        invited_email: 'test@test.com',
        going: true
    },
    {
        event_id: 1,
        user_id: 4,
        invited_email: 'jeff@jeff.com',
        going: true
    },
    {
        event_id: 3,
        user_id: 3,
        invited_email: 'andrew@andrew.com',
        going: true
    },
    {
        event_id: 1,
        user_id: 5,
        invited_email: 'tyler@tyler.com',
        going: true
    },
    {
        event_id: 1,
        user_id: 6,
        invited_email: 'taylor@taylor.com',
        going: true
    },
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