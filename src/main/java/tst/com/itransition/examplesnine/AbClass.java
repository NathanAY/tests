package tst.com.itransition.examplesnine;

abstract class AbClass {
    private int i = 4;

    public AbClass(int i) {

    }

    private void test1i() {
        System.out.println(i);
    }

    private static void dd2(){

    }

    public static void stm () {
        System.out.println("stm");
    }

    public void test1() {
        i = 22;
        test1();
    }
}
