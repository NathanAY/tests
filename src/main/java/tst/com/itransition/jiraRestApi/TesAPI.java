package tst.com.itransition.jiraRestApi;

//import com.atlassian.jira.issue.IssueManager;
//
//import com.sun.jersey.api.client.Client;
//import com.sun.jersey.api.client.ClientResponse;
//import com.sun.jersey.api.client.WebResource;
//import com.sun.jersey.api.client.filter.HTTPBasicAuthFilter;
import sun.net.www.URLConnection;

import java.net.URL;


public class TesAPI {

    public void test() {
        test2();
    }

    public String test1() {
        String targetURL = "http://servicedesk-st.itransition.corp/rest/api/2/issue/SD-56";
        String urlParameters = "";

        try {
//            Client client = Client.create();
//            client.addFilter(new HTTPBasicAuthFilter("a.yanchevsky", "notprogger"));
//            WebResource webResource = client.resource("http://ude-jira7-copy:8080/rest/api/2/issue/HD-167111");
//            String input="{\"fields\":{\"project\":{\"key\":\"JIRA\"},\"summary\":\"Test Ticket\",\"description\":\"This is a test CR\", \"reporter\": {\"name\": \"prasad\"},\"issuetype\":{\"name\":\"Defect\"},\"versions\":[{\"name\":\"1.0\"}],\"customfield_10692\":{\"value\":\"Stability\"},\"customfield_10430\":{\"value\":\"Stability\"},\"customfield_10005\":{\"value\":\"Blocker\"},\"components\":[{\"name\":\"TEST\"}]}}";
//            ClientResponse response = webResource.type("application/json").post(ClientResponse.class, input);
//            ClientResponse response = webResource.type("application/json").get(ClientResponse.class);
//
//            String output = response.getEntity(String.class);

            System.out.println("Output from Server .... \n");
//            System.out.println(output);
        } catch (Exception e ) {
            e.printStackTrace();
        }
        return null;
    }

    public void test2() {

    }
}
