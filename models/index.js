const User = require('./User');
const Event = require('./Event');
const Attraction = require('./Attraction');
const Attendee = require('./Attendee');


User.hasMany(Event, {
    foreignKey: 'admin_id',
    onDelete: 'CASCADE'
});

Event.belongsTo(User, {
    foreignKey: 'admin_id',
    onDelete: 'SET NULL',
});

Event.belongsToMany(User, {
     through: Attendee,
    foreignKey: "event_id"
});

User.belongsToMany(Event, {
    through: Attendee,
    foreignKey: "user_id"
});

Attendee.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
});

Attendee.belongsTo(Event, {
    foreignKey: 'event_id',
    onDelete: 'SET NULL',
});

Event.hasMany(Attendee, {
    foreignKey: 'event_id',
    onDelete: 'CASCADE'
});

User.hasMany(Attendee, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Event.hasMany(Attraction, {
    foreignKey: 'event_id',
    onDelete: 'CASCADE'
});

Attraction.belongsTo(Event, {
    foreignKey: 'event_id',
    onDelete: 'SET NULL',
});

module.exports = { User, Event, Attraction, Attendee };