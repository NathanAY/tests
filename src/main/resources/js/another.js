jQuery(function(){
    var nativeOnLoadingDone = JIRA.Components.IssueViewer.Services.IssueLoader.prototype._onLoadingDone;

    JIRA.Components.IssueViewer.Services.IssueLoader.prototype._onLoadingDone = function(data, meta, options) {
        if (data.isProjectCard) {
            var issueEntity = options.issueEntity;
            var test;
            if (issueEntity.detailView) {
                var issueId = issueEntity.id = data.issue.id;
                var a = test;

                var a11 = test;
                issueEntity.key = data.issue.key;
                //paste new issue view here
                var detailPanel = jQuery(".detail-panel");
                var style = 'style="height: 757px;"';

                detailPanel.html('<div class="issue-container" tabindex="-1"' + style + '><div id="issue-content" class="issue-edit-form"></div></div>');
                var issueContentPanel = jQuery("#issue-content");
                issueContentPanel.html(data.cardView);

                this._currentlyLoading = false;
                // Resolve the main promise
                options.loadingDeferred.resolve(data, meta, options);
            } else{


                //just redirect for now
                window.location.href = AJS.params.baseURL + "/secure/ViewCard.jspa?" + data.issue.key;
            }
        } else {
            nativeOnLoadingDone.apply(this,[data, meta, options]);
        }
    };
});

jQuery(function(){
    var nativeOnLoadingDone = JIRA.Components.IssueViewer.Services.IssueLoader.prototype._onLoadingDone;

    JIRA.Components.IssueViewer.Services.IssueLoader.prototype._onLoadingDone = function(data, meta, options) {
        if (data.isProjectCard) {
            var issueEntity = options.issueEntity;
            var test;
            if (issueEntity.detailView) {
                var issueId = issueEntity.id = data.issue.id;
                var a = test;

                var a11 = test;
                issueEntity.key = data.issue.key;
                //paste new issue view here
                var detailPanel = jQuery(".detail-panel");
                var style = 'style="height: 757px;"';

                detailPanel.html('<div class="issue-container" tabindex="-1"' + style + '><div id="issue-content" class="issue-edit-form"></div></div>');
                var issueContentPanel = jQuery("#issue-content");
                issueContentPanel.html(data.cardView);

                this._currentlyLoading = false;
                // Resolve the main promise
                options.loadingDeferred.resolve(data, meta, options);
            } else {

                //just redirect for now
                window.location.href = AJS.params.baseURL + "/secure/ViewCard.jspa?" + data.issue.key;
            }
        } else {
            nativeOnLoadingDone.apply(this,[data, meta, options]);
        }
    };
});
