package tst.com.itransition.enumagain;

public enum Week {
    WEEK1 {
        @Override
        public void getComment() {
            System.out.println("WEEK1");
        }

        @Override
        String getJql() {
            return null;
        }

        @Override
        void processIssue(String issue) {
            System.out.println("1 " + issue);
        }
    }, WEEK2 {
        @Override
        void getComment() {
            System.out.println("WEEK2");
        }

        @Override
        String getJql() {
            return null;
        }

        @Override
        void processIssue(String issue) {
            System.out.println("2 " + issue);
        }
    }, WEEK3 {
        @Override
        void getComment() {
            System.out.println("WEEK3");
        }

        @Override
        String getJql() {
            return null;
        }

        @Override
        void processIssue(String issue) {
            System.out.println("3 " + issue);
        }
    };

    abstract void getComment();
    abstract String getJql();
    abstract void processIssue(String issue);
}
