var socket = io();
socket.on('connect', function() {
    console.log('connected to socket.io server!');
});

socket.on('message', function(message) {
    var momentTimestamp = moment.utc(message.timestamp);
    console.log('new message');
    console.log(message.text);
    jQuery('.message').append('<p><strong>' + momentTimestamp.local().format('h:mm a') + ': </strong>' + message.text + '</p>');
});

var $form = jQuery('#message-form');
$form.on('submit', function(event) {
    event.preventDefault();
    var $message = $form.find('input[name=message]');
    socket.emit('message', {
        text: $message.val()
    });

    $message.val('');
});