 // Dom manipulation
 const captions = document.querySelectorAll('.course-caption');
 const feedbackCards = document.querySelectorAll('.feedback-card');

 // filtert die feedbacks nach ausgewählter lektion
 captions.forEach((caption) => {
     caption.addEventListener('click', () => {
         const selectedCourseTitle = caption.firstElementChild.innerHTML;
         const targetTitle = document.getElementById('classContent');
         targetTitle.value = selectedCourseTitle;
         const filteredFeedbacks = Array.from(feedbackCards).filter((card) => card.dataset.courseId === selectedCourseTitle);
         updateFeedbackSection(filteredFeedbacks);
     });
 });

 function updateFeedbackSection(filteredFeedbacks) {
     const feedbackContainer = document.querySelector('.feedbackContainer');
     feedbackContainer.innerHTML = '';

     filteredFeedbacks.forEach((feedback) => {
         feedbackContainer.appendChild(feedback);
     });
 }