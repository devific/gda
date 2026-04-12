import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, X } from "lucide-react";
import { imagekitBaseUrl, mentorsNotes } from "../data";

const mentorImages = [
  `${imagekitBaseUrl}/notes/1.jpeg`,
  `${imagekitBaseUrl}/notes/2.jpeg`,
  `${imagekitBaseUrl}/notes/4.jpeg`,
  `${imagekitBaseUrl}/notes/5.jpeg`,
  `${imagekitBaseUrl}/notes/6.jpeg`,
];

// Combine and shuffle items for the scrapbook
const scrapbookItems = [
  ...mentorsNotes.map((t) => ({ type: "note", data: t })),
  ...mentorImages.map((img) => ({ type: "image", data: img })),
].sort(() => Math.random() - 0.5);

const scrapbookItemsWithConstantFirst = [
  { type: "image", data: `${imagekitBaseUrl}/notes/3.jpeg` },
  ...scrapbookItems,
];

export default function About() {
  const [selectedNote, setSelectedNote] = useState<
    (typeof mentorsNotes)[0] | null
  >(null);

  // Handle ESC to close dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedNote(null);
    };
    if (selectedNote) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedNote]);

  return (
    <div className="min-h-screen overflow-hidden lg:pt-24 lg:pb-16 bg-stone-50">
      {/* Founder Section */}
      <section className="py-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full lg:w-1/2"
            >
              <div className="absolute w-24 h-24 rounded-full -top-4 -left-4 bg-primary/20 blur-3xl"></div>
              <div className="relative overflow-hidden shadow-2xl rounded-2xl">
                <img
                  alt="Shashank with a dog"
                  className="w-full h-[600px] object-cover"
                  src={`${imagekitBaseUrl}/notes/shash-devi.webp?tr=f-auto,q-auto,w-800`}
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute hidden p-8 -bottom-6 -right-6 bg-primary rounded-2xl md:block"
              >
                <p className="text-xl italic font-black leading-tight text-background-dark">
                  "Leadership is not <br />
                  about dominance; <br />
                  it's about clarity."
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <h1 className="mb-8 text-4xl font-extrabold leading-tight md:text-5xl">
                About <span className="text-primary">Shashank</span>
              </h1>
              <div className="space-y-6 text-lg leading-relaxed text-slate-600">
                <p>
                  GreenDog Academy was founded by Shashank, whose journey began
                  with a simple observation: most dog training addresses
                  symptoms, not the underlying psychology.
                </p>
                <p>
                  Over the last decade, Shashank has developed a method that
                  emphasizes structural care and the owner's role as a calm,
                  confident leader. By understanding how dogs perceive the
                  world, we bridge the communication gap between species.
                </p>
                <p>
                  Our approach doesn't just teach tricks; it fosters a state of
                  mind where dogs are relaxed, attentive, and secure in their
                  environment.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scrapbook Section */}
      <section className="relative py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-4xl font-extrabold"
            >
              Mentor Reflections
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-slate-600"
            >
              A collection of personal notes capturing guidance, growth, and
              shared experiences
            </motion.p>
          </div>

          <div className="gap-8 space-y-8 columns-1 sm:columns-2 lg:columns-3">
            {scrapbookItemsWithConstantFirst?.map((item, index) => {
              // Generate a random rotation between -4 and 4 degrees
              const rotation = Math.random() * 8 - 4;

              if (item.type === "note") {
                const note = item.data as (typeof mentorsNotes)[0];
                return (
                  <motion.div
                    key={`note-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: (index % 5) * 0.1 }}
                    whileHover={{ scale: 1.02, rotate: 0, zIndex: 10 }}
                    style={{ rotate: `${rotation}deg` }}
                    className="break-inside-avoid relative bg-[#FDFBF7] p-4 rounded-sm shadow-md border border-stone-200 transition-all duration-300 group"
                  >
                    {/* Tape effect */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm border border-white/50 shadow-sm rotate-[-2deg] z-10"></div>

                    <div
                      className="relative flex items-center justify-center w-full"
                      style={{ aspectRatio: `${note.dimW} / ${note.dimH}` }}
                    >
                      <img
                        src={`${imagekitBaseUrl}${note.image}?tr=f-auto,q-70,w-400`}
                        alt={`Handwritten note from ${note.author}`}
                        className="object-contain w-full h-full opacity-90 mix-blend-multiply"
                        loading="lazy"
                      />
                    </div>

                    {/* Transcript Button */}
                    <button
                      onClick={() => setSelectedNote(note)}
                      className="absolute z-20 flex items-center justify-center w-10 h-10 transition-colors bg-white border rounded-full shadow-sm lg:opacity-0 bottom-4 right-4 border-stone-200 text-stone-400 hover:text-primary hover:bg-stone-50 group-hover:opacity-100 focus:opacity-100"
                      aria-label={`Read transcript for ${note.author}'s note`}
                    >
                      <FileText className="w-5 h-5" />
                    </button>
                  </motion.div>
                );
              } else {
                const imgUrl = item.data as string;
                return (
                  <motion.div
                    key={`img-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: (index % 5) * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                    style={{ rotate: `${rotation}deg` }}
                    className="relative p-3 pb-10 transition-all duration-300 bg-white border rounded-sm shadow-lg break-inside-avoid border-stone-200"
                  >
                    {/* Photo corner effects */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-stone-300"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-stone-300"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-stone-300"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-stone-300"></div>

                    <img
                      src={`${imgUrl}?tr=f-auto,q-70,w-500`}
                      alt="Shashank with mentor"
                      className="w-full h-auto object-cover rounded-sm filter sepia-[0.2] contrast-110"
                      loading="lazy"
                    />
                    <p className="hidden absolute bottom-3 left-0 w-full text-center font-['Caveat',cursive] text-stone-600 text-lg">
                      Learning from the best
                    </p>
                  </motion.div>
                );
              }
            })}
          </div>
        </div>
      </section>

      {/* Transcript Dialog */}
      <AnimatePresence>
        {selectedNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNote(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-lg p-8 bg-white shadow-xl rounded-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
            >
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute p-2 transition-colors rounded-full top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <h3
                id="dialog-title"
                className="mb-4 text-xl font-bold text-slate-900"
              >
                Transcript
              </h3>

              <div className="prose prose-slate">
                <blockquote className="pl-4 my-6 text-lg italic border-l-4 text-slate-700 border-primary">
                  "{selectedNote.quote}"
                </blockquote>
                <p className="font-medium text-right text-slate-900">
                  — {selectedNote.author}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
