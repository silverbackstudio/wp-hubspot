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

        options.onFormSubmit = function( $form ){

            var formData = {};

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
            
            $form_container.trigger( 'formSubmit', [ $form, formData ] );
        };  
        
        options.onFormSubmitted = function( $form ){

    	    dataLayer.push({
                'event': 'formSubmitted', 
                'formAction': $form_container.data('name'), 
                'formName': $form_container.data('name'),
                'formGuid': options.formId,
            });
            
            $form_container.trigger( 'formSubmitted', [ $form ] );
        };          

        if ( hubspotFormThemeCss && $form_container.data('customCss') ) {
            options.onFormReady = function($form){ 
        	    $form.parent().addClass( $form_container.attr('class') );
        	    
        	    var cssStyle = $('<link rel="stylesheet" href="' + hubspotFormThemeCss + '" type="text/css" />');
        	    
        	    cssStyle.on('load', function(){
        	        hubspot.form.formRenderer.rerenderForms(hbspt.forms.shells); 
        	    });
        	    
        	    cssStyle.appendTo( $form.closest('html').find('head') );
        	    
        	    $form_container.trigger( 'formReady', [ $form ] );
        	};
        }
        
        if ( options.portalId && options.formId ) {
            hbspt.forms.create(options);    
        }
        
    });

})(jQuery);
