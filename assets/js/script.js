
jQuery(document).ready(function() {
    jQuery('.our-djs-edit').click(function () {
        var $this = jQuery(this);
        var id = $this.parent().find('.djsid').val();
        //console.log(`selected id ${id}`);
        $.get('/djs/'+id, function(data, status){
            if(data){
                name = data.name;
                designation = data.designation;
                shortBio = data.shortBio;
                longBio = data.longBio;
                photo = data.photo;
                social = data.social;
              //  console.log(social);
                jQuery('.modal-title').text(name);
                jQuery('#djsName').val(name);
                jQuery('#designation').val(designation);
                jQuery('#shortBio').val(shortBio);
                jQuery('#longBio').val(longBio);
                jQuery('#selectedId').val(id);
                jQuery('#artist-photo').attr('src',photo);
                social.forEach((data)=>{
                    jQuery('#'+data.name).val(data.link);
                });
                if(data.featuredDj){
                    jQuery('#featured').prop("checked", true);
                }else{
                    jQuery('#featured').prop("checked", false);
                }
                jQuery('#update-djs').attr('action', './djs/'+id);

                $('#djsModal').modal('show');
            }


        });
    });
    jQuery('#saveChanges').click(function (e) {
        e.preventDefault();
        var data = jQuery('#update-djs').serialize();
        // var form = document.getElementById('update-djs');
        // var formData = new FormData(form);
        // var fileInput = document.getElementById('file-input');
        // var file = fileInput.files[0];
        // formData.append('file', file);
        // console.log(data);
        var id = jQuery('#selectedId').val();
        jQuery.ajax({
            url: '/djs/'+id,
            method: 'put',

          // data:JSON.stringify(formData)
            data:data
        })
            .then(function(data) {
                    console.log(data);
            });

    });

});

