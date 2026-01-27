"use client"

import { SlideTemplate, SlideLabel, SlideHeading, SlideBody } from "./slide-template"

interface SlideStaffelbogenProps {
    isActive: boolean
    skipAnimations?: boolean
}

export function SlideStaffelbogen({ isActive, skipAnimations }: SlideStaffelbogenProps) {
    return (
        <SlideTemplate
            isActive={isActive}
            skipAnimations={skipAnimations}
            alignment="center"
            mode="paper"
            contentClassName="max-w-[1200px]"
        >
            <SlideLabel isActive={isActive} skipAnimations={skipAnimations} mode="paper">Möglicher Staffelbogen</SlideLabel>
            <SlideHeading isActive={isActive} skipAnimations={skipAnimations} mode="paper">WILDHOLZ – Staffel 1</SlideHeading>
            <SlideBody
                isActive={isActive}
                skipAnimations={skipAnimations}
                mode="paper"
                className="text-[clamp(0.95rem,0.85vw+0.6rem,1.25rem)]"
            >
                <ul className="space-y-3 text-left">
                    <li><span className="font-semibold">Folge 1:</span> Die Lesung und der Unfall → Erste Verwechslung im Krankenhaus.</li>
                    <li><span className="font-semibold">Folge 2–10:</span> Emily fährt mit nach WILDHOLZ, will eigentlich nur ein paar Tage da sein und bleibt.</li>
                    <li><span className="font-semibold">Bis Folge 50:</span> Emily in WILDHOLZ. Wird immer tiefer in die Familie hineingezogen. Hilft bei der Modernisierung des Forsthofs, kommt Paul gefährlich nahe.</li>
                    <li><span className="font-semibold">Folge 50:</span> Emily rettet das Sägewerk. Verbotener Kuss zwischen Emily und Paul. ❤️‍ Zeitgleich: Benjamin wacht im Krankenhaus auf.</li>
                    <li><span className="font-semibold">Folge 51–100:</span> Benjamin ist wach, aber hat sein Gedächtnis verloren. Glaubt deswegen, dass Emily wirklich seine Verlobte ist (sie hat ihm immer am Krankenbett vorgelesen, er erinnert sich an ihre Stimme). Trotz des heißen Kusses mit Paul entscheidet sich Emily für Benjamin. Von diesem Mann schwärmt sie seit Ewigkeiten und außerdem denken eh alle, dass sie seine Verlobte ist. Paul zieht sich verletzt zurück, was ihr das Herz bricht. Emily und Benjamin versuchen beide auf Teufel komm raus glücklich miteinander zu werden. Aber es will einfach nicht passen.</li>
                    <li><span className="font-semibold">Folge 100:</span> Die echte Verlobte steht plötzlich in WILDHOLZ. Erst jetzt hat sie von Benjamins Kopfverletzung erfahren, will ihn zurück. Aber er erinnert sich nicht an sie. Sie wird vom Forsthof gejagt, aber ihr Kommen hat eine Saat des Misstrauens gesetzt.</li>
                    <li><span className="font-semibold">Folge 100–150:</span> Annas Auftauchen sorgt bei Benjamin für Flashbacks an seine Erinnerungen. Kennt er sie wirklich nicht? Sein Gedächtnis kommt Stück für Stück zurück, was Emily immer mehr unter Druck setzt. Auch Paul ist Annas Besuch im Kopf geblieben, das war seltsam. Wer würde sich so was ausdenken? Er fängt an zu recherchieren…</li>
                    <li><span className="font-semibold">Folge 150:</span> Emilys wahre Identität und ihre Lügereien werden aufgedeckt. Paul hat herausgefunden, dass sie nicht Anna, sondern Emily ist. Gleichzeitig erinnert sich Benjamin an seine wahre Verlobte und sein kurzes Zusammentreffen mit Emily kurz vor seinem Unfall. Emily flieht aus Wildholz.</li>
                    <li><span className="font-semibold">Folge 150–180:</span> Emily zurück in der Großstadt. Unglücklich. Schämt sich in Grund und Boden, dass sie alle angelogen hat. Vermisst ihre neue Familie. Und vor allem Paul. Schreibt ihren eigenen WILDHOLZ-Roman. In ihm legt sie ihre eigene Geschichte offen, ihre Beweggründe und vor allem ihre großen Gefühle für Paul. Das erweicht sein Herz und er kommt zu ihr in die Großstadt.</li>
                    <li><span className="font-semibold">Folge 180:</span> Emily und Paul kommen ENDLICH zusammen ❤️‍</li>
                    <li><span className="font-semibold">Folge 180–200:</span> Paul bringt Emily nach Wildholz zurück. Auch bei den anderen Familienmitgliedern muss sie die Lüge ausbügeln und die kaputten Beziehungen reparieren.</li>
                    <li><span className="font-semibold">Folge 200:</span> Hochzeit Paul und Emily ❤️‍❤️‍❤️‍❤️‍❤️‍ Trauung vom protestantischen Pastor Christopher Keding – Love Interest in Staffel 2 für Schwester Lotte.</li>
                </ul>
            </SlideBody>
        </SlideTemplate>
    )
}
