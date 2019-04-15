package tst.com.itransition.examplesnine;

public class ExAbClass implements InterfaceDif, InterfaceDif2 {

    static void stm() {
        System.out.println("EX STM");
    }

    @Override
    public void test1() {
        System.out.println("overrided");
    }
}
