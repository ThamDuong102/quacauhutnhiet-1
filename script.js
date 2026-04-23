const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");
const revealItems = document.querySelectorAll(".reveal");
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const zaloPhone = "0988469739";

menuToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("open");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar?.classList.add("scrolled");
  } else {
    navbar?.classList.remove("scrolled");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = (data.get("name") || "Quý khách").toString();
  const phone = (data.get("phone") || "").toString().trim();
  const location = (data.get("location") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim();

  const requestLines = [
    "Yêu cầu báo giá từ website quacauhutnhiet.com",
    `- Họ tên: ${name}`,
    `- Số điện thoại: ${phone || "Chưa cung cấp"}`,
    `- Địa điểm công trình: ${location || "Chưa cung cấp"}`,
    `- Nhu cầu: ${message || "Chưa cung cấp"}`,
  ];

  const zaloText = requestLines.join("\n");
  const zaloUrl = `https://zalo.me/${zaloPhone}?text=${encodeURIComponent(zaloText)}`;

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(zaloText).catch(() => {
      // Ignore clipboard errors and continue opening Zalo.
    });
  }

  window.open(zaloUrl, "_blank", "noopener,noreferrer");

  formNote.textContent = `Cảm ơn ${name}! Chúng tôi đang mở Zalo tới số ${zaloPhone}. Nội dung đã được sao chép để bạn dán nhanh nếu cần.`;
  form.reset();
});
