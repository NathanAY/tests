package tst.com.itransition.examplesnine;

import java.io.FileNotFoundException;
import java.util.List;

public interface InterfaceDif {
    int i = 33;

    default void test1() {
        System.out.println("interface");
    };

    default void test45(){
    };

    static void testP() {
        System.out.println(i);
    }
}
