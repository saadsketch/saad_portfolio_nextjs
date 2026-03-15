import FadeIn from "@/components/animations/FadeIn";
import { experienceData } from "@/data/experience";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-slate-50">
      <div className="container-max">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">
            Background
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            Experience &amp; Education
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            My professional journey and the foundation that shaped my skills.
          </p>
        </FadeIn>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-200 via-violet-200 to-transparent" />

          <div className="space-y-10">
            {experienceData.map((item, i) => (
              <FadeIn key={`${item.company}-${i}`} delay={i * 0.1} direction="left">
                <div className="flex gap-6 sm:gap-8">
                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-sm border-2 ${
                        item.type === "education"
                          ? "bg-violet-50 border-violet-100"
                          : "bg-indigo-50 border-indigo-100"
                      }`}
                    >
                      {item.type === "education" ? (
                        <GraduationCap
                          className="text-violet-600"
                          size={22}
                        />
                      ) : (
                        <Briefcase className="text-indigo-600" size={22} />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className="bg-white rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all duration-300 p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                            {item.role}
                          </h3>
                          <p className="text-indigo-600 font-medium text-sm">
                            {item.company}
                          </p>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-1">
                          <span className="text-xs font-semibold text-white bg-indigo-600 rounded-full px-3 py-1">
                            {item.period}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <MapPin size={11} />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-2">
                        {item.bullets.map((bullet, bi) => (
                          <li
                            key={bi}
                            className="flex gap-2 text-sm text-gray-600"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
