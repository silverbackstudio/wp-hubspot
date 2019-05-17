
/**
 * WordPress dependencies
 */
const { omit } = lodash;

import classnames from 'classnames';

const { __ } = wp.i18n; // Import __() from wp.i18n

const {
	RichText,
	getColorClassName,
} = wp.editor;

import metadata from './block';

const { attributes } = metadata;

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
    },
    {
		attributes,
	
		supports: {
			anchor: true
		},	
		
		save( { attributes } ) {
				
				const { 
					portalId, 
					formId, 
					formName, 
					customCss,
					title, 
					titleLevel,
					subtitle,
					content,
					backgroundColor,
					customBackgroundColor,
					textColor,
					customTextColor,
					align,
					preloadFieldName,
					preloadFieldValue,
				} = attributes;
				
				const titleTag = titleLevel ? ('h' + titleLevel) : 'h2';		
				
				const backgroundClass = getColorClassName( 'background-color', backgroundColor );
				const textClass = getColorClassName( 'color', textColor );
		
				const classNames = classnames( {
					'has-text-color': textColor || customTextColor,
					'has-background': backgroundColor || customBackgroundColor,			
					[ textClass ]: textClass,
					[ backgroundClass ]: backgroundClass,			
				} );		
				
				const style = {
					backgroundColor: backgroundClass ? undefined : customBackgroundColor,
					color: textClass ? undefined : customTextColor,
					textAlign: align,
				};		
				
				return portalId && formId ? (
					<div className={ classNames } style={ style } >
						{ title && ( 
						<RichText.Content tagName={ titleTag } className={ 'wp-block-hubspot-form__title' } value={ title } /> 
						) }
						{ subtitle && ( 
						<RichText.Content tagName={ 'p' } className={ 'wp-block-hubspot-form__subtitle' } value={ subtitle } /> 
						) }
						{ content && ( 
						<RichText.Content tagName={ 'p' } className={ 'wp-block-hubspot-form__content' } value={ content } /> 
						) }
						<div 
							className={ 'wp-block-hubspot-form__form' }
							data-portal-id={ portalId }
							data-form-id={ formId }
							data-name={ formName }
							data-custom-css={ customCss ? 1 : '' } 
							data-preload-field={ preloadFieldName ? preloadFieldName : undefined }
							data-preload-value={ preloadFieldValue ? preloadFieldValue : undefined }
						></div>
					</div>
					
				) : null;
			},    	
    	
    }
];

export default deprecated;