const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");
const revealItems = document.querySelectorAll(".reveal");
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const zaloPhone = "0910315733";
const zaloPhoneDisplay = "0910 315 733";

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
  const zaloChatUrl = `https://chat.zalo.me/?phone=${zaloPhone}`;

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(zaloText).catch(() => {
      // Ignore clipboard errors and continue opening Zalo.
    });
  }

  window.open(zaloChatUrl, "_blank", "noopener,noreferrer");

  formNote.textContent = `Cảm ơn ${name}! Chúng tôi đang mở khung nhắn tin Zalo tới số ${zaloPhoneDisplay}. Nội dung đã được sao chép để bạn dán nhanh.`;
  form.reset();
});
