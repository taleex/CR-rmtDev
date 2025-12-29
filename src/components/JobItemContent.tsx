import { useActiveID, useJobItem } from "../lib/hooks";
import BookmarkIcon from "./BookmarkIcon";
import Spinner from "./Spinner";

export default function JobItemContent() {

    const activeID = useActiveID();
    const { jobItem: JobItem, isLoading } = useJobItem(activeID);

  if(isLoading){
    return <LoadingJobContent />;
  }

  if(!JobItem){
  return <EmptyJobContent />;}

  return (
    <section className="job-details">
      <div>
        <img
          src={JobItem.coverImgURL}
          alt="#"
        />

        <a
          className="apply-btn"
          href={JobItem.companyURL}
          target="_blank"
        >
          Apply
        </a>

        <section className="job-info">
          <div className="job-info__left">
            <div className="job-info__badge">{JobItem.badgeLetters}</div>
            <div className="job-info__below-badge">
              <time className="job-info__time">{JobItem.daysAgo}d</time>

              <BookmarkIcon id={JobItem.id}/>
            </div>
          </div>

          <div className="job-info__right">
            <h2 className="second-heading">{JobItem.title}</h2>
            <p className="job-info__company">{JobItem.company}</p>
            <p className="job-info__description">
              {JobItem.description}
            </p>
            <div className="job-info__extras">
              <p className="job-info__extra">
                <i className="fa-solid fa-clock job-info__extra-icon"></i>
                {JobItem.duration}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
                {JobItem.salary}
              </p>
              <p className="job-info__extra">
                <i className="fa-solid fa-location-dot job-info__extra-icon"></i>{" "}
                {JobItem.location}
              </p>
            </div>
          </div>
        </section>

        <div className="job-details__other">
          <section className="qualifications">
            <div className="qualifications__left">
              <h4 className="fourth-heading">Qualifications</h4>
              <p className="qualifications__sub-text">
                Other qualifications may apply
              </p>
            </div>
            <ul className="qualifications__list">
              {JobItem.qualifications.map((qualification) => (
              <li key={qualification} className="qualifications__item">{qualification}</li>))}
            </ul>
          </section>

          <section className="reviews">
            <div className="reviews__left">
              <h4 className="fourth-heading">Company reviews</h4>
              <p className="reviews__sub-text">
                Recent things people are saying
              </p>
            </div>
            <ul className="reviews__list">
              {
                JobItem.reviews.map((review) => (
                  <li key={review} className="reviews__item">{review}</li>
                ))
              }
            </ul>
          </section>
        </div>

        <footer className="job-details__footer">
          <p className="job-details__footer-text">
            If possible, please reference that you found the job on{" "}
            <span className="u-bold">rmtDev</span>, we would really appreciate
            it!
          </p>
        </footer>
      </div>
    </section>
  );
}

function LoadingJobContent() {
  return (
    <section className="job-details"> 
      <div>
        <Spinner/>
      </div>
    </section>
  );
}

function EmptyJobContent() {
  return (
    <section className="job-details">
      <div>
        <div className="job-details__start-view">
          <p>What are you looking for?</p>
          <p>
            Start by searching for any technology your ideal job is working with
          </p>
        </div>
      </div>
    </section>
  );
}
