
/* global wp */
/* global lodash */

const { Fragment, Component } = wp.element;
/**
 * External dependencies
 */
import classnames from 'classnames';
import HubspotForm from 'react-hubspot-form'

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n; // Import __() from wp.i18n
const { 
	RichText, 
	InspectorControls,
	BlockControls,
	ContrastChecker,
	PanelColorSettings,
	AlignmentToolbar,
	withColors,
} = wp.editor;

const { 
	Panel,
	PanelBody,
	TextControl,
	BaseControl,
	ToggleControl,
	Placeholder,
	Icon,
	Button,
	ButtonGroup
} = wp.components;

const { compose } = wp.compose;

import { HeadingToolbar } from './heading';
import icon from './icon';

class HubspotFormEdit extends Component {

	constructor () {
		super(...arguments);
		
		this.state = {
			portalId: '',
			formId: '',
		}		
		
	}

	render() {
		
		const {
			attributes,
			setAttributes,
			className,
			isSelected,
			backgroundColor,
			textColor,
			setBackgroundColor,
			setTextColor,
			clientId,			
		} = this.props;		
		
		const { 
			portalId, 
			formId, 
			formName, 
			customCss, 
			anchor,
			align,
			title,
			titleLevel,
			subtitle,
			content,
			preloadFieldName,
			preloadFieldValue,
		} = attributes;

		if ( !anchor ) {
			setAttributes({ anchor: 'form_' + clientId });
		}

		const classNames = classnames( className, {
			'is-selected': isSelected,
			[ backgroundColor.class ]: backgroundColor.class,
			[ textColor.class ]: textColor.class,
		} );		
		
		const style = {
			backgroundColor: backgroundColor.color,
			color: textColor.color,
			textAlign: align,			
		};

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

		const titleTag = titleLevel ? ('h' + titleLevel) : 'h2';

		return (
				<Fragment>
					<InspectorControls>
						<PanelBody title={ __( 'Form Settings', '_svbk' ) } initialOpen={ ( formId && portalId ) }>
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
						<PanelColorSettings
							title={ __( 'Color Settings' ) }
							initialOpen={ false }
	                        colorSettings={ [
								{
									value: backgroundColor.color,
									onChange: setBackgroundColor,
									label: __( 'Background Color' ),
								},
								{
									value: textColor.color,
									onChange: setTextColor,
									label: __( 'Text Color' ),
								},
							] }
						/>
						<ContrastChecker
							{ ...{
								textColor: textColor.color,
								backgroundColor: backgroundColor.color,
							} }
						/>							
						<PanelBody title={ __( 'Tracking', '_svbk' ) } initialOpen={ false } >
							<TextControl
								label={ __( 'Form Name', '_svbk' ) }
								value={ formName }
								onChange={ ( value ) => {
									setAttributes( { formName: value  } ) }
								}
								help = { __( 'Preload a field with the specified value. Use the file handle to specify the field. Ex. "lifecyclestage"', '_svbk') }
							/>	
							<BaseControl 
								label={ 'Preload Field' } 
								id={ 'hs-form-field-preload' }  
								className={ className }
								help={ __( 'Preload field ', '_svbk' ) }
							>
								<input className="components-text-control__input"
									type={ 'text' }
									id={ 'hs-form-field-preload' }
									value={ preloadFieldName }
									onChange={ ( event ) => {
										setAttributes( { preloadFieldName: event.target.value  } ) }
									}
								/>
								<span>{ __( 'with', '_svbk' ) }</span>
								<input className="components-text-control__input"
									type={ 'text' }
									id={ 'hs-form-field-value' }
									value={ preloadFieldValue }
									onChange={ ( event ) => {
										setAttributes( { preloadFieldValue: event.target.value  } ) }
									}
								/>			
							</BaseControl>							
						</PanelBody>						
					</InspectorControls> 
	                <BlockControls>
                        <HeadingToolbar minLevel={ 2 } maxLevel={ 5 } selectedLevel={ titleLevel } onChange={ ( newLevel ) => { setAttributes( { titleLevel: newLevel } ) } } />
						<AlignmentToolbar
							value={ align }
							onChange={ ( nextAlign ) => {
								setAttributes( { align: nextAlign } );
							} }
						/>				
					</BlockControls>					
					<div className={ classNames } style={ style } >
						<RichText
	    			    	tagName={ titleTag }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
							placeholder={ __( 'This is my title..', '_svbk' ) }
							className={ 'wp-block-hubspot-form__title' }
						/>
						<RichText
	    			    	tagName={ 'div' }
							value={ subtitle }
							onChange={ ( value ) => setAttributes( { subtitle: value } ) }
							placeholder={ __( 'This is my subtitle..', '_svbk' ) }
							className={ 'wp-block-hubspot-form__subtitle' }
						/>
						<RichText
							tagName={ 'div' }
							value={ content }
							onChange={ ( value ) => setAttributes( { content: value } ) }
							placeholder={ __( 'Content..', '_svbk' ) }
							className={ 'wp-block-hubspot-form__content' }
						/>					
						{ ( formId && portalId ) ? (
						<HubspotForm
						   portalId={ portalId }
						   formId={ formId }
						   //onSubmit={ () => console.log('Submit!') }
						   //onReady={ (form) => console.log('Form ready!') }
						   loading={ 'Loading...' }
						/>
						) : (
							    <Placeholder
							        icon={ ( <Icon icon={ icon } /> ) }
							        label={ __( 'Form Parameters', '_svbk' ) }
							    >
									<TextControl
										label={ __( 'Portal ID', '_svbk' ) }
										value={ portalId }
										onChange={ ( value ) => {
											this.setState( { portalId: value } ) 
										} }
										help = { __( 'The portal ID of your account', '_svbk') }
									/>
									<TextControl
										label={ __( 'Form ID', '_svbk' ) }
										value={ formId }
										onChange={ ( value ) => {
											this.setState( { formId: value } )
										} }
										help = { __( 'The Hubspot Form GUID', '_svbk') }
									/>
									<ButtonGroup>
										<Button isPrimary 
											className={ 'wp-block-hubspot-form__save' }
											onClick={ () => { setAttributes( this.state )  } }
										>
											{ __( 'Save' , '_svbk' ) }
										</Button>									
									</ButtonGroup>
								</Placeholder>
						)  }
					</div>						
				</Fragment>	
		);
	};	
    
}

export default compose( [
	withColors( 'backgroundColor', { textColor: 'color' } ),
] )( HubspotFormEdit );

