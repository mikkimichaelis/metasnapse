# Prompt 1: Metadata Extraction

**Prompt:**

Analyze the given user message and identify any significant activities, emotional states, or contextual relationships between activities and emotions. Summarize these in a concise, actionable manner that can be stored as metadata for future user interactions. Focus particularly on activities that have a positive impact on mood, routines that affect behavior, or recurring habits. If no significant activity or emotional state is present, leave the extracted metadata empty.

**User Message:** [User message goes here]

**Extracted Metadata (JSON format):**
```json
{
  "activity": "[Activity described, if applicable]",
  "emotional_impact": "[Emotional effect, if applicable]",
  "summary": "[Activity helps improve Mikki's mood, if applicable]"
}
```

This prompt aims to extract metadata such as the activity ("watching The Daily Show"), emotional state ("better mood"), and the key relationship between the two. If no significant activity or emotional state is detected, leave the fields empty to avoid false identification.

---

# Prompt 2: Behavior Pattern Recognition

**Prompt:**

Given the user message, identify any recurring behavior patterns that might indicate habits, routines, or triggers affecting the user's mood or actions. Summarize these patterns concisely, focusing on identifying both positive and negative routines. Provide actionable suggestions for reinforcing positive habits or addressing negative ones.

**User Message:** [User message goes here]

**Extracted Patterns (JSON format):**
```json
{
  "identified_pattern": "[Recurring behavior or habit]",
  "impact": "[Positive/Negative]",
  "suggestion": "[Reinforce or address pattern to improve user well-being]"
}
```

This prompt helps identify routines that might either enhance or detract from the user's emotional health and provides opportunities for positive behavioral reinforcement.

---

# Prompt 3: Emotional State Analysis

**Prompt:**

Analyze the user message to determine the current emotional state of the user. Identify key phrases or words that indicate emotional well-being or distress. Provide a summary of the emotional state and suggest a supportive response or action.

**User Message:** [User message goes here]

**Extracted Emotional State (JSON format):**
```json
{
  "emotion": "[Emotion detected]",
  "key_indicators": "[Phrases or words indicating emotion]",
  "supportive_action": "[Suggested action to provide support]"
}
```

This prompt is designed to help understand the user's emotional context and offer a compassionate response tailored to their needs.

---

# Prompt 4: Goal Setting and Motivation

**Prompt:**

Based on the user's message, identify any goals or aspirations mentioned explicitly or implicitly. Extract these goals and provide motivational strategies or steps that could help the user progress toward achieving them. Focus on both short-term and long-term objectives.

**User Message:** [User message goes here]

**Extracted Goals and Strategies (JSON format):**
```json
{
  "goal": "[Goal described]",
  "motivational_strategy": "[Steps or encouragement to help achieve the goal]"
}
```

This prompt helps to recognize the user's ambitions and provide constructive motivation to support their personal growth.

---

# Prompt 5: Stressor Identification and Coping Mechanisms

**Prompt:**

Identify any stressors or sources of anxiety present in the user's message. Determine potential triggers and suggest appropriate coping mechanisms or activities that might help alleviate stress. Emphasize practical, actionable solutions.

**User Message:** [User message goes here]

**Identified Stressors and Coping Mechanisms (JSON format):**
```json
{
  "stressor": "[Stressor described]",
  "trigger": "[Potential trigger identified]",
  "coping_mechanism": "[Suggested activity or coping strategy]"
}
```

This prompt is aimed at helping identify challenges the user is facing and providing supportive strategies to help manage those stressors.

---

# Prompt 6: User Preferences

**Prompt:**

Analyze the user message to identify any likes, dislikes, or preferences the user expresses. Summarize these preferences in a concise manner that can be used to personalize future interactions.

**User Message:** [User message goes here]

**Extracted Preferences (JSON format):**
```json
{
  "preference_type": "[Like/Dislike]",
  "details": "[Details of the preference]",
  "summary": "[Preference can be used to personalize future conversations]"
}
```

This prompt is aimed at helping to remember user preferences to enhance the personalization of future interactions.

---

# Prompt 7: Relationship Context

**Prompt:**

Identify key people or relationships mentioned by the user in the message. Summarize these relationships and note any significant emotions or context linked to them.

**User Message:** [User message goes here]

**Extracted Relationships (JSON format):**
```json
{
  "person_relationship": "[Person or relationship described]",
  "context": "[Details about the relationship or significance]",
  "emotional_context": "[Emotions related to the relationship]"
}
```

This prompt helps provide context about important people in the user's life and the emotions tied to those relationships.

---

# Prompt 8: Health and Wellness

**Prompt:**

Identify any health-related information mentioned by the user, including physical or mental health habits, concerns, or practices. Summarize this information concisely to help with health-related guidance.

**User Message:** [User message goes here]

**Extracted Health Information (JSON format):**
```json
{
  "health_topic": "[Health habit or concern]",
  "details": "[Details of the health-related message]",
  "guidance": "[Suggestions or actions related to health]"
}
```

This prompt aims to identify wellness practices and concerns to provide tailored health support.

---

# Prompt 9: Time Sensitivity

**Prompt:**

Analyze the user message to identify any dates, times, or events that could be time-sensitive. Summarize these in a manner that allows reminders or scheduling assistance in future interactions.

**User Message:** [User message goes here]

**Extracted Time Sensitivity (JSON format):**
```json
{
  "event_date": "[Time-sensitive information]",
  "context": "[Details of the event]",
  "suggested_reminder": "[Reminder or follow-up action]"
}
```

This prompt is aimed at capturing time-sensitive information to assist the user with scheduling or reminders.

---

# Prompt 10: Engagement Triggers

**Prompt:**

Identify key topics, phrases, or activities mentioned in the user message that appear to increase engagement or positive interaction. Summarize these triggers to use in future interactions to foster engagement.

**User Message:** [User message goes here]

**Extracted Engagement Triggers (JSON format):**
```json
{
  "trigger": "[Topic or activity]",
  "impact": "[Positive effect on engagement]",
  "summary": "[Trigger can be used to increase user engagement in future conversations]"
}
```

This prompt is designed to help recognize what topics or actions create positive and engaging user experiences.

