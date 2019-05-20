package tst.test2019;

import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.nCopies;
import static org.apache.commons.lang.StringUtils.join;

public class ArrayTest {
    public void test() {
        t1();
    }

    private void t1() {
        String issueKey = "UDE-1000, UDE-1000, HD-550";
        final String[] keys = issueKey.replaceAll("\\s+", "").split(",");
        String[] issuenums = new String[keys.length];
        String[] projectPkeys = new String[keys.length];

        List<String> issuenumsList = new ArrayList<>();
        List<String> projectPkeysList = new ArrayList<>();
        for (final String key : keys) {
            final String[] splitKey = key.split("-");
            System.out.println(splitKey.length);
            issuenumsList.add(splitKey[1]);
            projectPkeysList.add(splitKey[0]);
        }

        issuenums = issuenumsList.toArray(issuenums);
        projectPkeys = projectPkeysList.toArray(projectPkeys);

        System.out.println(issuenumsList);
        System.out.println(issuenumsList.size());
        System.out.println(projectPkeysList);

        System.out.println("[" + getPlaceholder(0) + "]");

    }

    public static String getPlaceholder(final int size) {
        return join(nCopies(size, "?"), ",");
    }
}
