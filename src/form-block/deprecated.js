
/**
 * WordPress dependencies
 */
const { omit } = lodash;

const deprecated = [
    {
	   
	    supports: {
        	anchor: true
        },
    	
		attributes: {
			portalId: {
				type: 'string',
		        source: 'attribute',
		        selector: 'div.wp-block-hubspot-form',
		        attribute: 'data-portal-id',	
			},
			formId: {
				type: 'string',
		        source: 'attribute',
		        selector: 'div.wp-block-hubspot-form',
		        attribute: 'data-form-id',
			},
			customCss: {
				type: 'boolean',
		        source: 'attribute',
		        selector: 'div.wp-block-hubspot-form',
		        attribute: 'data-custom-css',
		        default: true,
			},
			anchor: {
				type: 'string',
		        source: 'attribute',
		        selector: 'div.wp-block-hubspot-form',
		        attribute: 'id',		
			},				
			eventName: {
				type: 'string',
		        source: 'attribute',
		        selector: 'div.wp-block-hubspot-form',
		        attribute: 'data-event-name',
			},
		},        	

		migrate( attributes ) {
			const { eventName, ...migratedAttributes } = attributes;

			return {
				...migratedAttributes,
				formName: eventName, 
			};
		},
		
		save( { attributes } ) {
			const { portalId, formId, eventName, customCss } = attributes;

			return (
				<div 
					data-portal-id={ portalId }
					data-form-id={ formId }
					data-event-name={ eventName }
					data-custom-css={ customCss ? 1 : '' } 
				></div>
			);
		},
    },
    {
	    supports: {
        	anchor: true
        },

		attributes: {
			portalId: {
				type: 'string',
		        source: 'attribute',
		        selector: 'div.wp-block-hubspot-form',
		        attribute: 'data-portal-id',	
			},
			formId: {
				type: 'string',
		        source: 'attribute',
		        selector: 'div.wp-block-hubspot-form',
		        attribute: 'data-form-id',
			},
			customCss: {
				type: 'boolean',
		        source: 'attribute',
		        selector: 'div.wp-block-hubspot-form',
		        attribute: 'data-custom-css',
		        default: true,
			},	
			formName: {
				type: 'string',
		        source: 'attribute',
		        selector: 'div.wp-block-hubspot-form',
		        attribute: 'data-name',
			},				
		},
		       	
		save( { attributes } ) {
			const { portalId, formId, formName, customCss } = attributes;

			return (
				<div 
					data-portal-id={ portalId }
					data-form-id={ formId }
					data-name={ formName }
					data-custom-css={ customCss ? 1 : '' } 
				></div>
			);
		},
    }        
];

export default deprecated;