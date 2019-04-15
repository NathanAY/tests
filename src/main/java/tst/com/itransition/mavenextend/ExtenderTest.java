package tst.com.itransition.mavenextend;

import com.atlassian.jira.bc.issue.worklog.DefaultWorklogService;
import com.atlassian.jira.component.ComponentAccessor;

public class ExtenderTest {
    public void test() {
        System.out.println("AZAZAZ");
        DefaultWorklogService defaultWorklogService = ComponentAccessor.getComponent(DefaultWorklogService.class);
    }
}
