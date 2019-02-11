/**
 * BLOCK: svbk-hubspot2
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n

const { omit } = lodash;

const { Fragment } = wp.element;
const { 
	registerBlockType,
	createBlock
} = wp.blocks; 

const { 
	Path,
	SVG, 
	G,
	Panel,
	PanelBody,
	TextControl,
	ToggleControl,
} = wp.components;

const {
	InspectorControls,
	RichText,
} = wp.editor;


const supports = {
	anchor: true
};

const schema = {
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
registerBlockType( 'hubspot/form', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Hubspot Form' ), // Block title.
	icon: <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248 246"><path xmlns="http://www.w3.org/2000/svg" d="M103.798521,106.777299 C92.7306793,106.777299 83.7587284,97.8985374 83.7587284,86.9475573 C83.7587284,75.9946743 92.7306793,67.1159127 103.798521,67.1159127 C114.866363,67.1159127 123.838313,75.9946743 123.838313,86.9475573 C123.838313,97.8985374 114.866363,106.777299 103.798521,106.777299 M109.797768,48.7685016 L109.797768,31.127053 C114.45103,28.9520799 117.710236,24.2938697 117.710236,18.8878342 L117.710236,18.4806214 C117.710236,11.0194931 111.54178,4.91510664 104.002342,4.91510664 L103.592778,4.91510664 C96.0533392,4.91510664 89.8848826,11.0194931 89.8848826,18.4806214 L89.8848826,18.8878342 C89.8848826,24.2938697 93.1440889,28.9539828 97.797351,31.1289559 L97.797351,48.7685016 C90.8693744,49.8283967 84.5393996,52.656052 79.318901,56.8176147 L30.373121,19.1390122 C30.6961574,17.9116652 30.923052,16.6481637 30.9249748,15.3199649 C30.9326662,6.87125044 24.0219951,0.0114270942 15.4807594,9.91250375e-06 C6.94336934,-0.0095044056 0.00962419728,6.83129031 1.00193251e-05,15.2819076 C-0.00960415863,23.732525 6.90106696,30.5923483 15.4423027,30.6018626 C18.2246458,30.6056684 20.8012454,29.8235914 23.0586544,28.5524785 L71.2045348,65.618359 C67.1108178,71.7341627 64.711119,79.0601876 64.711119,86.9475573 C64.711119,95.2040825 67.3473266,102.842177 71.8006138,109.12353 L57.1601437,123.613836 C56.0025966,123.269418 54.8027472,123.029657 53.5298301,123.029657 C46.513403,123.029657 40.8237325,128.658328 40.8237325,135.601877 C40.8237325,142.547329 46.513403,148.176 53.5298301,148.176 C60.54818,148.176 66.2359276,142.547329 66.2359276,135.601877 C66.2359276,134.345987 65.9936504,133.156697 65.6456171,132.011174 L80.1284148,117.678805 C86.7025897,122.643376 94.8900236,125.627066 103.798521,125.627066 C125.386196,125.627066 142.884,108.309104 142.884,86.9475573 C142.884,67.6087543 128.528109,51.6323114 109.797768,48.7685016" fill="#FF7A59"/></SVG>,
	category: 'embed',
	keywords: [
		__( 'hubspot' ),
		__( 'form' )
	],

	attributes: schema,

	supports,

	transforms: {
	    from: [
	        {
	            type: 'shortcode',
	            tag: 'hubspot',
	            attributes: {
	                // An attribute can be source from the shortcode attributes
	                portalId: {
	                    type: 'string',
	                    shortcode: ( { named: { portal = '' } } ) => portal,
	                },
	                // An attribute can be source from the shortcode attributes
	                formId: {
	                    type: 'string',
	                    shortcode: ( { named: { id = '' } } ) => id,
	                },
	            },
	        },
			{
				type: 'raw',
				selector: 'div',
				schema: {
					div: { attributes: [ 'data-portal-id', 'data-form-id' ] },
				},
				//isMatch: ( node ) => node.dataset && node.dataset.block === 'hubspot/form',
				transform( node ) {
					
					const { portalId, formId } = node.dataset;
					const attrs = {};
	
					if ( portalId ) {
						attrs.portalId = portalId;
					}
					
					if ( formId ) {
						attrs.formId = formId;
					}
					
					return createBlock( 'hubspot/form', attrs );
				},
			},	        
	    ],
	},

    deprecated: [
        {
        	supports:{
				anchor: true
			},
        	
			attributes: {
				...omit( schema, [ 'formName' ] ),
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
        }
    ],

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
	edit: function( {
			attributes,
			setAttributes,
			className,
			clientId,
		} ) {
		
		const { portalId, formId, formName, customCss, anchor } = attributes;

		if ( !anchor ) {
			setAttributes({ anchor: 'form_' + clientId });
		}

		const editor = (
			<Fragment>
				<TextControl
					label={ __( 'Portal ID', '_svbk' ) }
					value={ portalId }
					onChange={ ( value ) => {
						setAttributes( { portalId: value  } ) }
					}
					help = { __( 'The portal ID of your account', '_svbk') }
				/>
				<TextControl
					label={ __( 'Form ID', '_svbk' ) }
					value={ formId }
					onChange={ ( value ) => {
						setAttributes( { formId: value  } ) }
					}
					help = { __( 'The Hubspot Form GUID', '_svbk') }
				/>
			</Fragment>
		);

		return (
				<Fragment>
					<InspectorControls>
						<PanelBody title={ __( 'Settings', '_svbk' ) }>
						 { editor }
						</PanelBody>
						<PanelBody title={ __( 'Style', '_svbk' ) } initialOpen={ false } >
							<ToggleControl
								label={ __( 'Use theme custom CSS', '_svbk' ) }
								checked={ customCss }
								onChange={ ( value ) => {
									setAttributes( { customCss: Boolean( value )  } ) }
								}
								help = { __( 'Apply Theme Custom Css', '_svbk') }
							/>	
						</PanelBody>
						<PanelBody title={ __( 'Tracking', '_svbk' ) } initialOpen={ false } >
							<TextControl
								label={ __( 'Form Name', '_svbk' ) }
								value={ formName }
								onChange={ ( value ) => {
									setAttributes( { formName: value  } ) }
								}
								help = { __( 'The form name will be used to identify the submission. Ex. On the event that is fired after the form has been submitted successfully', '_svbk') }
							/>		
						</PanelBody>						
					</InspectorControls> 
					<div className={ className } >
						<p>{ 'Hubspot Form' }{ formName ? ( ' (' + formName + ')' ) : ''}</p>
						{ ( !formId || !portalId ) && ( <span class="warning">{ 'Please enter parameters in the options sidebar' }</span> )  }
					</div>						
				</Fragment>	
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( { attributes } ) {
		
		const { portalId, formId, formName, customCss } = attributes;
		
		return portalId && formId ? (
			<div 
				data-portal-id={ portalId }
				data-form-id={ formId }
				data-name={ formName }
				data-custom-css={ customCss ? 1 : '' } 
			></div>
		) : null;
	},
} );
