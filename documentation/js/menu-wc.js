'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">cabilapp documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link" >HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomePageModule-0fe2d00df702c737ae4edfd5c2b9595c4d48950c3952c930606d1ab105b8f3f069e039a45975bca1bdf560b75b6ec759c4ff4cf75fef4430fd8018626aed58dd"' : 'data-target="#xs-components-links-module-HomePageModule-0fe2d00df702c737ae4edfd5c2b9595c4d48950c3952c930606d1ab105b8f3f069e039a45975bca1bdf560b75b6ec759c4ff4cf75fef4430fd8018626aed58dd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-0fe2d00df702c737ae4edfd5c2b9595c4d48950c3952c930606d1ab105b8f3f069e039a45975bca1bdf560b75b6ec759c4ff4cf75fef4430fd8018626aed58dd"' :
                                            'id="xs-components-links-module-HomePageModule-0fe2d00df702c737ae4edfd5c2b9595c4d48950c3952c930606d1ab105b8f3f069e039a45975bca1bdf560b75b6ec759c4ff4cf75fef4430fd8018626aed58dd"' }>
                                            <li class="link">
                                                <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageRoutingModule.html" data-type="entity-link" >HomePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SurveyPageModule.html" data-type="entity-link" >SurveyPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SurveyPageModule-be227b970dcdfd7a6ca2374e66a1a3f3e2f00adf41d6a6dd4be2468a460d83e4922eadcc6d4e2d095feeddd490f545aa95162daa4242893c2e3060533433ccda"' : 'data-target="#xs-components-links-module-SurveyPageModule-be227b970dcdfd7a6ca2374e66a1a3f3e2f00adf41d6a6dd4be2468a460d83e4922eadcc6d4e2d095feeddd490f545aa95162daa4242893c2e3060533433ccda"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SurveyPageModule-be227b970dcdfd7a6ca2374e66a1a3f3e2f00adf41d6a6dd4be2468a460d83e4922eadcc6d4e2d095feeddd490f545aa95162daa4242893c2e3060533433ccda"' :
                                            'id="xs-components-links-module-SurveyPageModule-be227b970dcdfd7a6ca2374e66a1a3f3e2f00adf41d6a6dd4be2468a460d83e4922eadcc6d4e2d095feeddd490f545aa95162daa4242893c2e3060533433ccda"' }>
                                            <li class="link">
                                                <a href="components/MainformComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainformComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SurveyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SurveyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SurveyListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SurveyListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SurveyPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SurveyPage</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SurveyPageModule-be227b970dcdfd7a6ca2374e66a1a3f3e2f00adf41d6a6dd4be2468a460d83e4922eadcc6d4e2d095feeddd490f545aa95162daa4242893c2e3060533433ccda"' : 'data-target="#xs-directives-links-module-SurveyPageModule-be227b970dcdfd7a6ca2374e66a1a3f3e2f00adf41d6a6dd4be2468a460d83e4922eadcc6d4e2d095feeddd490f545aa95162daa4242893c2e3060533433ccda"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SurveyPageModule-be227b970dcdfd7a6ca2374e66a1a3f3e2f00adf41d6a6dd4be2468a460d83e4922eadcc6d4e2d095feeddd490f545aa95162daa4242893c2e3060533433ccda"' :
                                        'id="xs-directives-links-module-SurveyPageModule-be227b970dcdfd7a6ca2374e66a1a3f3e2f00adf41d6a6dd4be2468a460d83e4922eadcc6d4e2d095feeddd490f545aa95162daa4242893c2e3060533433ccda"' }>
                                        <li class="link">
                                            <a href="directives/OnlynumbersDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OnlynumbersDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SurveyPageRoutingModule.html" data-type="entity-link" >SurveyPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DbService.html" data-type="entity-link" >DbService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubjectsService.html" data-type="entity-link" >SubjectsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SurveyService.html" data-type="entity-link" >SurveyService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AnswerSurvey.html" data-type="entity-link" >AnswerSurvey</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/mainForm.html" data-type="entity-link" >mainForm</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Survey.html" data-type="entity-link" >Survey</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});