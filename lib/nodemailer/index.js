import { createTransport } from "nodemailer";
import { emailPurposes } from "../utils/tabs";

const { USER, PASS, NEXTAUTH_URL } = process.env;

const transport = createTransport({
  service: "gmail",
  auth: {
    user: USER,
    pass: PASS,
  },
});

export const generateEmailBody = (type, data, from) => {
  let subject = "";
  let body = "";
  switch (type) {
    case emailPurposes.INVITE:
      subject = `Invitation to Join Our ${data.title} Team`;
      body = render(<Invite url={NEXTAUTH_URL} data={data} from={from} />);
      break;

    case emailPurposes.ISSUE_ASSIGNED:
      subject = `Issue Assigned from ${data.team.title} Team`;
      body = render(<IssueAssigned data={data} url={NEXTAUTH_URL} />);
      break;

    case emailPurposes.ISSUE_IN_REVIEW:
      subject = `Issue Under Review form ${data.team.title} Team`;
      body = render(<IssueInReview data={data} url={NEXTAUTH_URL} />);
      break;

    case emailPurposes.REVIEW_ISSUE_ADMIN:
      subject = `Review Issue from ${data.team.title} Team`;
      body = render(<ReviewIssueAdmin data={data} url={NEXTAUTH_URL} />);
      break;

    case emailPurposes.ISSUE_SOLVED:
      subject = `Issue Reviewed and Verified from ${data.team.title} Team`;
      body = render(<IssueSolved data={data} url={NEXTAUTH_URL} />);
      break;

    case emailPurposes.ISSUE_UNSOLVED:
      subject = `Issue Review Update from ${data.team.title}Team`;
      body = render(<IssueUnsolved data={data} url={NEXTAUTH_URL} />);
      break;

    default:
      null;
  }
  return { subject, body };
};

export const sendMail = async (emailContent, sendTo) => {
  const mailOptions = {
    form: USER,
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  };
  transport.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);
    return;
  });
};
