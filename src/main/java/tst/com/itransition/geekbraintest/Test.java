package tst.com.itransition.geekbraintest;

import tst.com.itransition.examplesnine.ExAbClass;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;

import static org.apache.commons.lang.StringUtils.substringBetween;

public class Test {
    static int k = 3;
    private static int outpri = 3;
    public  String outin = "234";

    public void test1() {
        try {
            test2();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void test2() throws IOException {
        String description = "Добрый день!\n" +
                "Этот запрос создан автоматически для продления действия ресурса RESCARD-10130 на максимальный срок.\n" +
                "\n" +
                "Информация о ресурсе:\n" +
                "\n" +
                "Summary: SkillsUSA Web Portal (SKLSUS)\n" +
                "Resource Type: JIRA Project\n" +
                "Due date: 29/Jan/19\n" +
                "Project card: RESCARD-345 PROJCARD-1587 (SkillsUSA Web Portal)";

        final String rescard = "RESCARD-" +substringBetween(description, "RESCARD-", " ");
        System.out.println(rescard);
    }

    static class Test2 extends ExAbClass {
        public int iner;
        public void testIN1() {
            outpri = 3;

            test1();
        }
    }

}
