/* global hubspotFormThemeCss */
/* global dataLayer */
/* global hbspt */
/* global jQuery */

window.dataLayer = window.dataLayer || [];            

(function($){

    $('.wp-block-hubspot-form').each(function(){
        var $form_container = $(this);

        var options = {};
        
        if ( $form_container.data('portalId') ) {
            options.portalId =  $form_container.data('portalId');
        }
        
        if ( $form_container.data('portalId') ) {
            options.formId = $form_container.data('formId');
        }    
        
        if ( $form_container.attr('id') ) {
            options.target = '#' + $form_container.attr('id');
        }            

        var formData = {};

        options.onFormSubmit = function( $form ){
    	    
    	    formData = $form.serializeArray().reduce( function( accu, item ) {
    	       accu[item.name] = item.value;
    	       return accu;
    	    }, {});

            if ( formData.hs_context )  {
                formData.hs_context = JSON.parse( formData.hs_context );
            }
    	    
    	    dataLayer.push({
                'event': 'formSubmit', 
                'formAction': $form_container.data('name'), 
                'formName': $form_container.data('name'),
                'formGuid': options.formId,
                'formElement': $form,
                'formData': formData
            });
        };  
        
        options.onFormSubmitted = function( $form ){
    	    dataLayer.push({
                'event': 'formSubmitted', 
                'formAction': $form_container.data('name'), 
                'formName': $form_container.data('name'),
                'formGuid': options.formId,
                'formData': formData
            });
        };          

        if ( hubspotFormThemeCss && $form_container.data('customCss') ) {
            options.onFormReady = function($form){ 
        	    $('<link rel="stylesheet" href="' + hubspotFormThemeCss + '" type="text/css" />').appendTo( $form.closest('html').find('head') );
        	    $form.addClass( $form_container.attr('class') );
        	    
        	    //Render forms again with new style
        	    hubspot.form.formRenderer.rerenderForms(hbspt.forms.shells.length);
        	    
        	};
        }
        
        if ( options.portalId && options.formId ) {
            hbspt.forms.create(options);    
        }
        
    });

})(jQuery);