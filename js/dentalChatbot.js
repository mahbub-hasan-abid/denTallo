// Firebase is available globally via CDN scripts included in the HTML files.
// You can use firebase.* APIs directly in this file if needed.

// Dental Chatbot Logic
const dentalChatbotBtn = document.getElementById('dentalChatbotBtn');
const dentalChatbotWindow = document.getElementById('dentalChatbotWindow');
const closeDentalChatbot = document.getElementById('closeDentalChatbot');
const dentalChatbotMessages = document.getElementById('dentalChatbotMessages');
const dentalChatbotInput = document.getElementById('dentalChatbotInput');
const dentalSendMessage = document.getElementById('dentalSendMessage');

const dentalResponses = {
	'hello': { message: "👋 Hi there! I'm your dental assistant. How can I help you today?", quickReplies: [
		"Book an Appointment",
		"Ask a Question",
		"Report Pain or Emergency",
		"Learn About Services",
		"Talk About My First Visit",
		"I'm Nervous About Visiting 😬",
		"Provide Feedback"
	] },
	'appointment': { message: "To book an appointment, please visit our contact page or let me know your preferred date and service.", quickReplies: ["Book Now", "Services", "Location"] },
	'services': { message: "We offer: Teeth Cleaning, Whitening, Root Canal, Braces, Implants, and more. Which are you interested in?", quickReplies: ["Teeth Cleaning", "Whitening", "Root Canal", "Braces"] },
	'contact': { message: "You can call us at +880 17 1234 5678 or visit House 12, Road 5, Dhanmondi, Dhaka.", quickReplies: ["Location", "Book Appointment"] },
	'tips': { message: "Brush twice daily, floss, and visit your dentist every 6 months! Need more tips?", quickReplies: ["More Tips", "Book Appointment"] },
	'firstvisit': { message: "✅ General Info<br>May I have your full name, please?", quickReplies: [] },
	'agegroup': { message: "How old are you? (Optional for personalized care tips)", quickReplies: ["Under 12", "13–18", "19–30", "31–50", "Over 50"] },
	'firsttime': { message: "Is this your first time visiting us?", quickReplies: ["Yes", "No"] },
	'default': { message: "👋 Hi there! I'm your dental assistant. How can I help you today?", quickReplies: [
		"Book an Appointment",
		"Ask a Question",
		"Report Pain or Emergency",
		"Learn About Services",
		"Talk About My First Visit",
		"I'm Nervous About Visiting 😬",
		"Provide Feedback"
	] }
};

// Add a conversational flow for a comprehensive dental assistant experience
const dentalFlow = [
	{
		key: 'greeting',
		message: "Hi there! I'm your dental assistant. How can I help you today?",
		quickReplies: [
			"Book an Appointment",
			"Ask a Question",
			"Report Pain or Emergency",
			"Learn About Services",
			"Talk About My First Visit",
			"I'm Nervous About Visiting 😬",
			"Provide Feedback"
		]
	},
	{
		key: 'fullname',
		message: "What is your full name?",
		quickReplies: []
	},
	{
		key: 'agegroup',
		message: "What is your age group?",
		quickReplies: [
			"Under 12",
			"13–18",
			"19–30",
			"31–50",
			"Over 50"
		]
	},
	{
		key: 'firstvisit',
		message: "Is this your first time visiting us?",
		quickReplies: ["Yes", "No"]
	},
	{
		key: 'schedulefirst',
		message: "Would you like to schedule your first visit now?",
		quickReplies: ["Yes, let's do it!", "Tell me more first", "I'm not sure yet"]
	},
	{
		key: 'dentalissues',
		message: "Are you having any dental issues today?",
		quickReplies: [
			"Tooth pain",
			"Gum bleeding",
			"Sensitive teeth",
			"Bad breath",
			"Loose or broken tooth",
			"Swelling",
			"No issues, just checking in"
		]
	},
	{
		key: 'painlevel',
		message: "On a scale of 1 to 10, how would you rate your discomfort?",
		quickReplies: []
	},
	{
		key: 'homeremedy',
		message: "Would you like advice on home remedies before visiting?",
		quickReplies: ["Yes please", "No thanks"]
	},
	{
		key: 'anxious',
		message: "Are you feeling anxious about visiting the dentist?",
		quickReplies: ["A little", "Yes, very", "Not at all"]
	},
	{
		key: 'comfort',
		message: "What would help you feel more comfortable?",
		quickReplies: [
			"Explain procedures beforehand",
			"Offer breaks during treatment",
			"Use gentle techniques",
			"All of the above",
			"No thanks"
		]
	},
	{
		key: 'apptype',
		message: "What type of appointment would you like to schedule?",
		quickReplies: [
			"Cleaning",
			"Checkup",
			"Emergency",
			"Cosmetic consultation",
			"Pediatric care",
			"Orthodontics (Braces)",
			"Root canal / Extraction"
		]
	},
	{
		key: 'doctor',
		message: "Preferred doctor?",
		quickReplies: [
			"Dr. Md Habibur Rahman",
			"Dr. Afroja Noor",
			"Dr. Arifur Rahman",
			"Dr. Samira Khan",
			"No preference"
		]
	},
	{
		key: 'datetime',
		message: "What date and time would you prefer for your appointment?",
		quickReplies: ["Morning", "Afternoon", "Evening"] // Date picker would be UI, here just time slots
	},
	{
		key: 'reminder',
		message: "Would you like a reminder before your appointment?",
		quickReplies: ["Yes, SMS", "Yes, Email", "No reminder"]
	},
	{
		key: 'treatment',
		message: "What treatment did you receive?",
		quickReplies: [
			"Extraction",
			"Root canal",
			"Cleaning",
			"Fillings",
			"Crown/Bridge",
			"Whitening",
			"Not sure"
		]
	},
	{
		key: 'aftercare',
		message: "Would you like aftercare tips sent via?",
		quickReplies: ["WhatsApp", "SMS", "Email"]
	},
	{
		key: 'postdiscomfort',
		message: "Are you experiencing discomfort after treatment?",
		quickReplies: ["Yes — I'll describe it", "No, I'm doing well", "I'm not sure"]
	},
	{
		key: 'pricing',
		message: "Would you like detailed pricing or payment options for a specific service?",
		quickReplies: ["Yes, please send details", "No, thanks"]
	},
	{
		key: 'insurance',
		message: "Do you have dental insurance?",
		quickReplies: ["Yes", "No", "Not sure"]
	},
	{
		key: 'provider',
		message: "Which insurance provider do you use?",
		quickReplies: ["Provider A", "Provider B", "Provider C", "Other / Not listed"]
	},
	{
		key: 'planhelp',
		message: "Would you like help understanding your plan coverage?",
		quickReplies: ["Yes please", "No, I already know"]
	},
	{
		key: 'usedinsurance',
		message: "Have you used your insurance with us before?",
		quickReplies: ["Yes", "No"]
	},
	{
		key: 'paymethod',
		message: "How would you like to pay?",
		quickReplies: [
			"Insurance",
			"Cash",
			"Credit/Debit Card",
			"Mobile Payment (Apple Pay, Google Pay, etc.)",
			"Need a payment plan",
			"I'd like to talk to billing first"
		]
	},
	{
		key: 'planpref',
		message: "If you need a payment plan, what would you prefer?",
		quickReplies: [
			"Schedule a billing consultation",
			"Receive plan details by email",
			"Call us to discuss now"
		]
	},
	{
		key: 'moreinfo',
		message: "Would you like more info about:",
		quickReplies: [
			"Payment deadlines and policies",
			"Discounts and promotions",
			"Financing options for major treatments",
			"None"
		]
	},
	{
		key: 'comfortamenities',
		message: "Would you like any comfort amenities during your visit?",
		quickReplies: [
			"Music or headphones",
			"Blanket or neck support",
			"Calming environment (low lights, scents)",
			"No special preferences"
		]
	},
	{
		key: 'lastvisit',
		message: "How was your last visit?",
		quickReplies: ["Excellent", "Good", "Okay", "Not great"]
	},
	{
		key: 'review',
		message: "Would you like to leave a review or suggestion?",
		quickReplies: ["Yes", "Maybe later"]
	},
	{
		key: 'cleaningreminder',
		message: "Would you like to be reminded for regular cleanings?",
		quickReplies: ["Every 6 months", "Once a year", "No reminders"]
	},
	{
		key: 'thanks',
		message: "Thank you for choosing our dental clinic! We're here whenever you need us.",
		quickReplies: []
	},
	{
		key: 'goodbye',
		message: "Wishing you a healthy and bright smile! Have a great day!",
		quickReplies: []
	}
];

function addDentalMessage(content, sender = 'bot', quickReplies = []) {
	const msgDiv = document.createElement('div');
	msgDiv.style.marginBottom = '15px';
	msgDiv.style.display = 'flex';
	msgDiv.style.justifyContent = sender === 'bot' ? 'flex-start' : 'flex-end';
	const bubble = document.createElement('div');
	bubble.style.maxWidth = '80%';
	bubble.style.padding = '12px 16px';
	bubble.style.borderRadius = '18px';
	bubble.style.lineHeight = '1.4';
	bubble.style.fontSize = '14px';
	bubble.style.background = sender === 'bot' ? '#fff' : 'linear-gradient(135deg,#007bff,#0056b3)';
	bubble.style.color = sender === 'bot' ? '#333' : '#fff';
	bubble.style.boxShadow = sender === 'bot' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none';
	bubble.innerHTML = content;
	msgDiv.appendChild(bubble);
	if (quickReplies.length) {
		const qrDiv = document.createElement('div');
		qrDiv.style.display = 'flex';
		qrDiv.style.flexWrap = 'wrap';
		qrDiv.style.gap = '8px';
		qrDiv.style.marginTop = '10px';
		quickReplies.forEach(qr => {
			const btn = document.createElement('button');
			btn.textContent = qr;
			btn.style.background = '#e9ecef';
			btn.style.border = 'none';
			btn.style.padding = '8px 12px';
			btn.style.borderRadius = '15px';
			btn.style.fontSize = '12px';
			btn.style.cursor = 'pointer';
			btn.style.transition = 'all 0.3s ease';
			btn.onmouseover = () => { btn.style.background = '#007bff'; btn.style.color = '#fff'; };
			btn.onmouseout = () => { btn.style.background = '#e9ecef'; btn.style.color = '#333'; };
			btn.onclick = () => handleDentalQuickReply(qr);
			qrDiv.appendChild(btn);
		});
		bubble.appendChild(qrDiv);
	}
	dentalChatbotMessages.appendChild(msgDiv);
	dentalChatbotMessages.scrollTop = dentalChatbotMessages.scrollHeight;
}

function handleDentalQuickReply(reply) {
	addDentalMessage(reply, 'user');
	setTimeout(() => processDentalMessage(reply), 400);
}

function processDentalMessage(msg) {
	const text = msg.toLowerCase();
	if (text.includes('hello') || text.includes('hi')) {
		addDentalMessage(dentalResponses.hello.message, 'bot', dentalResponses.hello.quickReplies);
	} else if (text.includes('appoint')) {
		addDentalMessage(dentalResponses.appointment.message, 'bot', dentalResponses.appointment.quickReplies);
	} else if (text.includes('service')) {
		addDentalMessage(dentalResponses.services.message, 'bot', dentalResponses.services.quickReplies);
	} else if (text.includes('contact') || text.includes('phone') || text.includes('call')) {
		addDentalMessage(dentalResponses.contact.message, 'bot', dentalResponses.contact.quickReplies);
	} else if (text.includes('tip')) {
		addDentalMessage(dentalResponses.tips.message, 'bot', dentalResponses.tips.quickReplies);
	} else if (text.includes('first visit') || text.includes('first time') || text.includes('my first visit')) {
		addDentalMessage(dentalResponses.firstvisit.message, 'bot');
		setTimeout(() => addDentalMessage(dentalResponses.agegroup.message, 'bot', dentalResponses.agegroup.quickReplies), 1200);
		setTimeout(() => addDentalMessage(dentalResponses.firsttime.message, 'bot', dentalResponses.firsttime.quickReplies), 2400);
	} else {
		addDentalMessage(dentalResponses.default.message, 'bot', dentalResponses.default.quickReplies);
	}
}

dentalChatbotBtn.onclick = () => {
	dentalChatbotWindow.style.display = 'flex';
	dentalChatbotBtn.style.display = 'none';
	if (!dentalChatbotMessages.hasChildNodes()) {
		addDentalMessage("Hello! I'm your dental assistant. How can I help you today?", 'bot', dentalResponses.default.quickReplies);
	}
};
closeDentalChatbot.onclick = () => {
	dentalChatbotWindow.style.display = 'none';
	dentalChatbotBtn.style.display = 'flex';
};
dentalSendMessage.onclick = () => {
	const msg = dentalChatbotInput.value.trim();
	if (msg) {
		addDentalMessage(msg, 'user');
		dentalChatbotInput.value = '';
		setTimeout(() => processDentalMessage(msg), 400);
	}
};
dentalChatbotInput.addEventListener('keypress', e => {
	if (e.key === 'Enter') {
		dentalSendMessage.onclick();
	}
}); 