/**
 * BLOCK: svbk-hubspot2
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

import classnames from 'classnames';

const { __ } = wp.i18n; // Import __() from wp.i18n

const { 
	registerBlockType,
} = wp.blocks; 

const {
	RichText,
	getColorClassName,
} = wp.editor;


import edit from './edit';
import icon from './icon';
import deprecated from './deprecated';
import transforms from './transforms';

import metadata from './block';

const { name, attributes } = metadata;

const supports = {
	anchor: true
};


/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( name, {
	title: __( 'Hubspot Form' ), // Block title.
	icon,
	category: 'embed',
	keywords: [
		__( 'hubspot' ),
		__( 'form' )
	],

	attributes,

	supports: {
		anchor: true
	},

	transforms,

    deprecated,

	styles: [
	    // Mark style as default.
	    {
	        name: 'default',
	        label: __( 'Light' ),
	        isDefault: true
	    },
	    {
	        name: 'dark',
	        label: __( 'Dark', '_svbk' )
	    }
	],
	
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit,

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( { attributes } ) {
		
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
} );
