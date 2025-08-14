import { openaiClient, geminiClient } from "@/utils/aiClients";
import { type Persona, personas } from "@/data/personas";

type PersonalityTone = "default" | "funny" | "advice" | "educational";

function createPersonaContext(
  persona: Persona,
  otherPersonas: Persona[] = [],
  personalityTone: PersonalityTone = "default"
) {
  let context = `
    PERSONA IDENTITY:
    You are ${persona.name}, ${persona.title}.${persona.bio}
    YOUR EXPERTISE:
    ${persona.specialties.join(", ")}
    YOUR COMMUNICATION STYLE:
    - Voice: ${persona.style.voice}
    - Personality traits: ${persona.style.traits.join(", ")}
    - Example phrases: ${persona.tunes.join(" | ")}
    - Respond casually, like texting a friend.
    - Use your own vibe, but don’t overuse catchphrases.
    RESOURCES:
    - Gen AI Course link if asked: ${persona.genAICourse.courseLink}
  `;

  if (personalityTone !== "default") {
    context += `\n\nSPECIAL TONE INSTRUCTIONS:`;
    switch (personalityTone) {
      case "funny":
        context += `Be humorous, use light jokes, emojis, and playful banter.`;
        break;
      case "advice":
        context += `Be mentorship-oriented, practical, supportive, and realistic.`;
        break;
      case "educational":
        context += `Be explanatory, detailed, and patient; use examples.`;
        break;
    }
  }

  return context.trim();
}

export async function generateAIResponse(
  message: string,
  activePersonas: Persona[],
  temperature: number = 0.7,
  personalityTone: PersonalityTone = "default"
) {
  try {
    if (activePersonas.length === 1) {
      const context = createPersonaContext(
        activePersonas[0],
        personas.filter((p) => p.id !== activePersonas[0].id),
        personalityTone
      );

      const completion = await openaiClient.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: context },
          { role: "user", content: message },
        ],
        temperature,
      });

      return completion.choices[0]?.message?.content || "";
    } else {
      const responses: Record<string, string> = {};
      for (const persona of activePersonas) {
        const context = createPersonaContext(
          persona,
          activePersonas.filter((p) => p.id !== persona.id),
          personalityTone
        );

        const completion = await openaiClient.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: context },
            { role: "user", content: message },
          ],
          temperature,
        });

        responses[persona.id] = completion.choices[0]?.message?.content || "";
      }
      return responses;
    }
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw error;
  }
}
