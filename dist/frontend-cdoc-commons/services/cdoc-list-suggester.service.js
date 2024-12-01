import { StringUtils } from '@dps/mycms-commons/dist/commons/utils/string.utils';
var CommonDocListSuggesterService = /** @class */ (function () {
    function CommonDocListSuggesterService(commonDocDataService) {
        this.commonDocDataService = commonDocDataService;
        this.DEFAULT_NAME_REPLACEMENTS = [
            [/ \d\d\.\d\d\.\d\d\d\d/, ''],
            [/mit .*? (durch |von |ab |bei |in |nach )+/, '$1']
        ];
        this.searchOptions = {
            loadDetailsMode: 'none',
            showFacets: false,
            loadTrack: false,
            showForm: false
        };
    }
    CommonDocListSuggesterService.prototype.suggest = function (form, environment) {
        var _this = this;
        return new Promise(function (resolve) {
            var suggestion = 'TODODESC\n\n\n';
            var listItems = [];
            var searchForm = _this.createListItemSearchForm(form, environment);
            _this.appendFiltersToListItemSearchForm(searchForm, form, environment);
            return _this.commonDocDataService.search(searchForm, _this.searchOptions).then(function (searchResult) {
                if (searchResult && searchResult.recordCount > 0) {
                    listItems = searchResult.currentRecords;
                }
                suggestion += _this.generateHeading(form, environment);
                if (listItems.length > 0) {
                    suggestion += '\n' +
                        listItems.map(function (listItem) {
                            return _this.generateListItem(listItem, form, environment);
                        }).join('') +
                        '\n\n';
                }
                suggestion += _this.generateFooter(form, environment);
                return resolve(suggestion);
            }).catch(function (reason) {
                console.error('cant suggest desc', reason);
                suggestion += _this.generateHeading(form, environment);
                suggestion += '\n' +
                    _this.generateListFallback(form, environment) +
                    '\n\n';
                suggestion += _this.generateFooter(form, environment);
                return resolve(suggestion);
            });
        });
    };
    CommonDocListSuggesterService.prototype.generateHeading = function (form, environment) {
        var template = this.getConfiguration(environment).headingTemplate
            || '**Was für ein Trip**\n\n';
        return this.doReplacements(template, form, environment);
    };
    CommonDocListSuggesterService.prototype.generateFooter = function (form, environment) {
        var template = this.getConfiguration(environment).footerTemplate
            || '\nMehr dazu auf den nächsten Seiten\n';
        return this.doReplacements(template, form, environment);
    };
    CommonDocListSuggesterService.prototype.generateListFallback = function (form, environment) {
        var template = this.getConfiguration(environment).listItemsFallbackTemplate
            || '- [Track1](sections/start/show/track/TRACK_1)\n' +
                '- [Track2](sections/start/show/track/TRACK_2)\n' +
                '- [Track3](sections/start/show/track/TRACK_3)\n';
        return this.doReplacements(template, form, environment);
    };
    CommonDocListSuggesterService.prototype.generateListItem = function (item, form, environment) {
        var template = this.getConfiguration(environment).listItemTemplate
            || '- [{{LISTITEM.name}}](sections/start/show/track/{{LISTITEM.id}})\n';
        return this.doReplacements(template.replace('{{LISTITEM.id}}', item.id).replace('{{LISTITEM.name}}', item.name), form, environment);
    };
    CommonDocListSuggesterService.prototype.createListItemSearchForm = function (form, environment) {
        return this.commonDocDataService.newSearchForm({
            sort: 'dateAsc',
            perPage: 99
        });
    };
    CommonDocListSuggesterService.prototype.doReplacements = function (template, form, environment) {
        return this.doNameReplacements(this.replaceDefaultPlaceholder(template, form, environment), form, environment);
    };
    CommonDocListSuggesterService.prototype.replaceDefaultPlaceholder = function (template, form, environment) {
        return template.replace('{{MAINITEM.id}}', form['id'])
            .replace('{{MAINITEM.name}}', form['name']);
    };
    CommonDocListSuggesterService.prototype.getCommonReplacements = function (environment) {
        return StringUtils.createReplacementsFromConfigArray(this.getConfiguration(environment).nameReplacements);
    };
    CommonDocListSuggesterService.prototype.doNameReplacements = function (template, form, environment) {
        return StringUtils.doReplacements(template, this.getCommonReplacements(environment));
    };
    return CommonDocListSuggesterService;
}());
export { CommonDocListSuggesterService };
//# sourceMappingURL=cdoc-list-suggester.service.js.map