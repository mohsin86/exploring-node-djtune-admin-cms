$(document).ready(function() {
    var socket = io.connect();

    var form = $('#chatForm');
    var txt = $('#txt');
    var chatArea = $('#chat-area');

    form.submit(function(e) {
        e.preventDefault();
        socket.emit('sending message', txt.val());
        txt.val('');
    })

    socket.on('new message', function(data){
        if(data.message !=''){
            chatArea.append(`<div class="message">
                        <div class="float-left">
                            <div class="avatar">
                                <img class="img-avatar" src="img/avatars/7.jpg" alt="admin@bootstrapmaster.com">
                                <span class="avatar-status badge-success"></span>
                            </div>
                        </div>
                        <div>
                            <small class="text-muted font-weight-bold">Lukasz Holeczek</small>
                            <small class="text-muted float-right mt-1">1:52 PM</small>
                        </div>
                        <small class="text-muted"> ${data.message}</small>
                    </div>
                    <hr>`);
        }
    });
});

//
