package logicSDM.Store.Feedback;

import java.util.Date;

public class Feedback {
    private Integer rating;
    private String feedback;
    private String userName;
    private Date date;

    public Feedback(int rating, String feedback, Date date, String userName) {
        this.rating = rating;
        this.feedback = feedback;
        this.date = date;
        this.userName = userName;
    }

    /**
     * used in the AddFeedback servlet
     */
    public Feedback() {

    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}


