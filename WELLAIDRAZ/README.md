# **Early Prediction of Sepsis**

## **Background and Problem Statement**
Sepsis, a life-threatening medical condition caused by the body’s dysregulated response to infection, is a leading cause of morbidity and mortality worldwide. Timely identification and intervention are essential for improving survival rates and mitigating organ damage. However, current diagnostic methods often fall short in detecting sepsis during its early and more treatable stages.

This project addresses these challenges by developing a machine learning-based predictive model for early sepsis detection. Using electronic health records (EHR) and real-time physiological data, the model leverages advanced algorithms to analyze patient data for patterns and trends indicative of sepsis. This approach provides clinicians with actionable insights, enabling timely interventions that improve patient outcomes, reduce mortality rates, and optimize healthcare resource allocation.

---

## **Impact and Proposed Solution**
Our solution proactively identifies individuals at risk of sepsis by analyzing key health indicators and risk factors using advanced machine learning models. By offering early prediction capabilities, this system empowers patients to seek timely medical advice and make informed decisions, potentially averting critical complications.

The societal impact of this solution is profound, with the potential to:
- Save lives by preventing severe complications and mortality.
- Reduce treatment costs through early intervention and decreased ICU admissions.
- Enable efficient resource utilization in healthcare facilities.
- Foster a culture of proactive health management and awareness.

---

## **Project Outcomes and Deliverables**

1. **Enhanced Patient Awareness**: Provide patients with an early understanding of their sepsis risk, enabling them to take proactive measures to mitigate it.
2. **Reduced Mortality Rates**: Facilitate timely interventions based on early warnings, significantly improving survival rates.
3. **Improved Clinical Decision-Making**: Deliver predictive insights that empower healthcare providers to allocate resources effectively and prioritize patient care.
4. **Cost Efficiency**: Lower overall treatment expenses due to reduced ICU admissions and a shift toward preventive care.

---

## **Instruction Guide**

### **1. Install Required Libraries**
Navigate to the project’s root directory and execute the following command to install dependencies:
```bash
pip install -r requirements.txt
```
### **2. Run APIs**
Launch the APIs necessary for the application:

- LLM Chatbot API (Language Model):
```bash
python APIs/LLM_API.py
```
- Random Forest API for 8 Features (Patient Predictions):
```bash
python APIs/RF_8F_API.py
```
- Random Forest API for 40 Features (Doctor Predictions):
```bash
python APIs/RF_40F_API.py
```
** 3. Set Up the Front-End Application **
Install Node.js to enable running the Next.js application. Follow the official installation guide at Node.js Installation Guide.

- Navigate to the /APP folder:
```bash
cd APP
```
- Install front-end dependencies:
```bash
npm install
```
- Start the development server::
```bash
npm run dev
```
#### Once the development server is running, the application can be accessed via the specified localhost URL.
