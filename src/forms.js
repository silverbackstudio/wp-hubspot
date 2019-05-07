/* global hubspotFormThemeCss */
/* global dataLayer */
/* global hbspt */
/* global jQuery */

window.dataLayer = window.dataLayer || [];            

(function($){

    $('.wp-block-hubspot-form').each(function(){
        var $form_wrapper = $(this)
        var $form_container = $(this).find('.wp-block-hubspot-form__form');

        var options = {};
        
        if ( $form_container.data('portalId') ) {
            options.portalId =  $form_container.data('portalId');
        }
        
        if ( $form_container.data('portalId') ) {
            options.formId = $form_container.data('formId');
        }    
        
        if ( $form_wrapper.attr('id') ) {
            options.target = '#' + $form_wrapper.attr('id') + ' .wp-block-hubspot-form__form';
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

	    options.onFormReady = function($form){ 

            $form.addClass( $form_wrapper.attr('class') );
            
            if (  $form_wrapper.attr('style') ) {
                $form.attr( 'style',  ($form.attr('style') || '')  + $form_wrapper.attr('style') );
            }

            if ( hubspotFormThemeCss && $form_container.data('customCss') ) {
    	    
        	    var cssStyle = $('<link rel="stylesheet" href="' + hubspotFormThemeCss + '" type="text/css" />');
        	    
        	    cssStyle.on('load', function(){
        	        hubspot.form.formRenderer.rerenderForms(hbspt.forms.shells); 
        	    });
        	    
        	    cssStyle.appendTo( $form.closest('html').find('head') );
            }
            
    	    $form_container.trigger( 'formReady', [ $form ] );
        	    
      	};
        
        if ( options.portalId && options.formId ) {
            hbspt.forms.create(options);    
        }
        
    });

})(jQuery);