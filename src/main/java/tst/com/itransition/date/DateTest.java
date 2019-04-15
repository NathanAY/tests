package tst.com.itransition.date;

import org.apache.commons.lang.StringUtils;
import org.joda.time.DateTime;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.apache.commons.lang.StringUtils.substringBetween;

public class DateTest {
    public void test() throws ParseException {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        long startTime = System.nanoTime();
        Date date = simpleDateFormat.parse("2019-01-21 00:00");
        Date date1 = new DateTime().minusMonths(1).toDate();
        String format = simpleDateFormat.format(date);

        Calendar time = new GregorianCalendar();
        
        
        System.out.println("date = " + date);
        System.out.println("format = " + format);
        System.out.println("" + new DateTime().minusMonths(1).getMillis());

        System.out.println(new SimpleDateFormat("d").format(date));
        System.out.println(new SimpleDateFormat("d").format(time.getTime()));

        String comment = "Summary: AuthenticatedRequestFactory\n" +
                "Link: https://servicedesk-st.itransition.corp/browse/SD-82?focusedWorklogId=10300&page=com.atlassian.jira.plugin.system.issuetabpanels%3Aworklog-tabpanel#worklog-10300\n" +
                "Comment: ";
        final String worklogId = StringUtils.substringBetween(comment, "#worklog-", "\n");

        System.out.println(worklogId);
        try {
            this.wait(5000L);
        } catch (Exception e) {
            e.printStackTrace();
        }
        long finish = System.nanoTime();

        System.out.println("time " + (finish - startTime)/1000000);
    }
}
