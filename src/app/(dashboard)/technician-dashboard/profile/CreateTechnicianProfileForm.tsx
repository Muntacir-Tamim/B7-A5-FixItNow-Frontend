"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createTechnicianProfile } from "@/app/(dashboard)/_actions/createTechnicianProfile";

const SKILL_SUGGESTIONS = [
  "AC Repair",
  "Plumbing",
  "Electrical",
  "Painting",
  "Carpentry",
  "Cleaning",
  "Welding",
  "Tiling",
];

export default function CreateTechnicianProfileForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);

    const payload = {
      bio: (fd.get("bio") as string) || undefined,
      skills: skills.length > 0 ? skills : undefined,
      experience: fd.get("experience")
        ? Number(fd.get("experience"))
        : undefined,
      location: (fd.get("location") as string) || undefined,
    };

    try {
      await createTechnicianProfile(payload);

      toast.success("Profile created successfully!");
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-sm p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">
            Complete Your Profile
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            You need a technician profile to receive bookings. All fields are
            optional — you can update them later.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              rows={3}
              placeholder="Tell customers about yourself and your expertise..."
              className="w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Skills
            </label>

            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 text-primary/60 hover:text-primary"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Type a skill and press Enter or comma..."
              className="w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />

            <div className="flex flex-wrap gap-1.5 mt-2">
              {SKILL_SUGGESTIONS.filter((s) => !skills.includes(s)).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => addSkill(s)}
                  className="px-2.5 py-1 text-xs border border-border rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Years of Experience
            </label>
            <input
              type="number"
              name="experience"
              min={0}
              max={50}
              placeholder="e.g. 5"
              className="w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Dhaka, Chittagong..."
              className="w-full px-3 py-2 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Profile..." : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
