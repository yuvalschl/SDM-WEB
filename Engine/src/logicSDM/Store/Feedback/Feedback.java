package logicSDM.Store.Feedback;

public class Feedback {
    private int rating;
    private String feedback;

    public Feedback(int rating, String feedback) {
        this.rating = rating;
        this.feedback = feedback;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        if(rating <= 5 && rating >= 1){
            this.rating = rating;
        }
        else {
            throw new IllegalArgumentException(rating + "is invalid");
        }
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}


