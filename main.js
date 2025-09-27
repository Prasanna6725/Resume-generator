document.addEventListener("DOMContentLoaded", () => {
  function updateResume() {
    // simple fields
    document.getElementById("p-name").textContent = document.getElementById("name").value || "Your Name";
    document.getElementById("p-role").textContent = document.getElementById("role").value || "Your Title";
    document.getElementById("p-email").textContent = document.getElementById("email").value || "you@example.com";
    document.getElementById("p-phone").textContent = document.getElementById("phone").value || "+91 XXXXXXXX";
    document.getElementById("p-location").textContent = document.getElementById("location").value || "City, Country";
    document.getElementById("p-summary").textContent = document.getElementById("summary").value || "A short summary goes here...";

    // list fields
    ["education","experience","projects"].forEach(id => {
      const val = document.getElementById(id).value.trim();
      const ul = document.getElementById("p-" + id);
      ul.innerHTML = "";
      if (val) {
        val.split("\n").forEach(line => {
          const li = document.createElement("li");
          li.textContent = line.trim();
          ul.appendChild(li);
        });
      } else {
        const li = document.createElement("li");
        li.textContent = "No " + id + " added yet";
        ul.appendChild(li);
      }
    });

    // skills
    const skillsVal = document.getElementById("skills").value.trim();
    document.getElementById("p-skills").textContent = skillsVal || "Python, HTML, CSS";
  }

  // Attach listeners
  document.querySelectorAll("#resumeForm input, #resumeForm textarea")
    .forEach(el => el.addEventListener("input", updateResume));

  updateResume();

  // PDF Download
  document.getElementById("downloadBtn").addEventListener("click", () => {
    const resumeElement = document.getElementById("resumePreview");

    const options = {
      margin:       0.5,
      filename:     'resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(resumeElement).save();
  });
});
