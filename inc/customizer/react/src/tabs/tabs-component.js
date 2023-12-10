/* jshint esversion: 6 */
import PropTypes from 'prop-types';
const { __ } = wp.i18n;

const { ButtonGroup, Dashicon, Tooltip, Button } = wp.components;

const { Component, Fragment } = wp.element;
class TabsComponent extends Component {
	constructor() {
		super( ...arguments );
		this.focusPanel = this.focusPanel.bind( this );
		let defaultParams = {
			'general': {
				'label': 'General',
				'target' : '',
			},
			'design': {
				'label': 'Design',
				'target' : 'design',
			},
			'active': 'general',
		};
		this.controlParams = this.props.control.params.input_attrs ? {
			...defaultParams,
			...this.props.control.params.input_attrs,
		} : defaultParams;
	}
	focusPanel( section ) {
		let self = this;
		let otherSection;
		let secton_id = ( 'woocommerce_product_catalog_design' === section || 'woocommerce_product_catalog' === section || 'woocommerce_store_notice' === section || 'woocommerce_store_notice_design' === section ? section : 'cryptozfree_customizer_' + section )
		if ( section === self.controlParams.design.target ) {
			otherSection = ( 'woocommerce_product_catalog_design' === section || 'woocommerce_product_catalog' === section || 'woocommerce_store_notice' === section || 'woocommerce_store_notice_design' === section ? self.controlParams.general.target : 'cryptozfree_customizer_' + self.controlParams.general.target );
		} else {
			otherSection = ( 'woocommerce_product_catalog_design' === section || 'woocommerce_product_catalog' === section || 'woocommerce_store_notice' === section || 'woocommerce_store_notice_design' === section ? self.controlParams.design.target : 'cryptozfree_customizer_' + self.controlParams.design.target );
		}
		if ( undefined !== self.props.customizer.section( secton_id ) ) {
			const container = self.props.customizer.section( secton_id ).contentContainer[0];
			const otherContainer = self.props.customizer.section( otherSection ).contentContainer[0];
			container.classList.add( 'cryptozfree-prevent-transition' );
			otherContainer.classList.add( 'cryptozfree-prevent-transition' );
			setTimeout( function(){
				self.props.customizer.section( secton_id ).focus();
			}, 10);
			setTimeout( function(){
				container.classList.remove( 'cryptozfree-prevent-transition' );
				container.classList.remove( 'busy' );
				container.style.top = null;
				otherContainer.classList.remove( 'cryptozfree-prevent-transition' );
				otherContainer.classList.remove( 'busy' );
			}, 300);
		}
	}
	render() {
		return (
			<div className="customize-control-cryptozfree_blank_control">
				<div className="customize-control-description">
					<div class="cryptozfree-nav-tabs cryptozfree-compontent-tabs nav-tab-wrapper wp-clearfix">
						<Button className={ `nav-tab cryptozfree-general-tab cryptozfree-compontent-tabs-button cryptozfree-nav-tabs-button${ 'general' === this.controlParams.active ? ' nav-tab-active' : '' }` } onClick={ () => this.focusPanel( this.controlParams.general.target ) }>
							<span>{ this.controlParams.general.label }</span>
						</Button>
						<Button className={ `nav-tab cryptozfree-design-tab cryptozfree-compontent-tabs-button cryptozfree-nav-tabs-button${ 'design' === this.controlParams.active ? ' nav-tab-active' : '' }` } onClick={ () => this.focusPanel( this.controlParams.design.target ) }>
							<span>{ this.controlParams.design.label }</span>
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

TabsComponent.propTypes = {
	control: PropTypes.object.isRequired,
	customizer: PropTypes.object.isRequired
};

export default TabsComponent;
