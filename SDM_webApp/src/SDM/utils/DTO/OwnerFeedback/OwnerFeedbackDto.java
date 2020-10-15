package SDM.utils.DTO.OwnerFeedback;

import logicSDM.Store.Feedback.Feedback;

import java.util.Date;

public class OwnerFeedbackDto {
    private int rating;
    private String feedback;
    private String userName;
    private Date date;

    public OwnerFeedbackDto(Feedback feedback) {
        this.rating = feedback.getRating();
        this.feedback = feedback.getFeedback();
        this.userName = feedback.getUserName();
        this.date = feedback.getDate();
    }
}
