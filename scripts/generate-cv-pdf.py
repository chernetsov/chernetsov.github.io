from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Misha Chernetsov, CV.pdf"

BLUE = colors.HexColor("#2563EB")
DARK = colors.HexColor("#111827")
MUTED = colors.HexColor("#4B5563")
RULE = colors.HexColor("#D1D5DB")

styles = getSampleStyleSheet()
name_style = ParagraphStyle(
    "Name",
    parent=styles["Title"],
    fontName="Helvetica-Bold",
    fontSize=24,
    leading=27,
    textColor=DARK,
    alignment=TA_LEFT,
    spaceAfter=2,
)
tagline_style = ParagraphStyle(
    "Tagline",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=10,
    leading=13,
    textColor=MUTED,
)
contact_style = ParagraphStyle(
    "Contact",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.5,
    leading=12,
    textColor=MUTED,
    alignment=TA_LEFT,
)
section_style = ParagraphStyle(
    "Section",
    parent=styles["Heading2"],
    fontName="Helvetica-Bold",
    fontSize=10,
    leading=12,
    textColor=BLUE,
    spaceAfter=0,
)
title_style = ParagraphStyle(
    "EntryTitle",
    parent=styles["Heading3"],
    fontName="Helvetica-Bold",
    fontSize=10,
    leading=12,
    textColor=DARK,
    spaceAfter=1.5,
)
meta_style = ParagraphStyle(
    "EntryMeta",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8,
    leading=10,
    textColor=MUTED,
    spaceAfter=2.5,
)
body_style = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.5,
    leading=11,
    textColor=DARK,
)
footer_style = ParagraphStyle(
    "Footer",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=7.5,
    textColor=colors.HexColor("#6B7280"),
    alignment=TA_LEFT,
)


def entry(title: str, dates: str, description: str, section: str = ""):
    left = Paragraph(section, section_style) if section else ""
    right = [
        Paragraph(title, title_style),
        Paragraph(dates, meta_style),
        Paragraph(description, body_style),
    ]
    table = Table([[left, right]], colWidths=[1.15 * inch, 5.75 * inch])
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return KeepTogether([table, Spacer(1, 0.1 * inch)])


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.5)
    canvas.line(doc.leftMargin, 0.42 * inch, LETTER[0] - doc.rightMargin, 0.42 * inch)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(colors.HexColor("#6B7280"))
    canvas.drawString(doc.leftMargin, 0.25 * inch, "Misha Chernetsov")
    canvas.drawRightString(
        LETTER[0] - doc.rightMargin,
        0.25 * inch,
        f"{doc.page}",
    )
    canvas.restoreState()


def build():
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=LETTER,
        leftMargin=0.55 * inch,
        rightMargin=0.55 * inch,
        topMargin=0.45 * inch,
        bottomMargin=0.55 * inch,
        title="Misha Chernetsov - CV",
        author="Misha Chernetsov",
    )

    header = Table(
        [
            [
                [
                    Paragraph("Misha Chernetsov", name_style),
                    Paragraph(
                        "Technical leader building agentic AI, developer platforms, "
                        "data systems, and high-performing engineering teams.",
                        tagline_style,
                    ),
                ],
                Paragraph(
                    "Austin, TX<br/>"
                    "206-484-8910<br/>"
                    '<a href="mailto:chernetsov@gmail.com" color="#2563EB">'
                    "chernetsov@gmail.com</a><br/>"
                    '<a href="https://www.linkedin.com/in/mchernetsov/" color="#2563EB">'
                    "linkedin.com/in/mchernetsov</a>",
                    contact_style,
                ),
            ]
        ],
        colWidths=[4.8 * inch, 2.1 * inch],
    )
    header.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )

    story = [header, Spacer(1, 0.18 * inch)]
    story.append(
        entry(
            "Superhuman / Area Tech Lead",
            "October 2025 - Present, Austin, remote",
            "Building ubiquitous agentic AI for work and education.",
            "Experience",
        )
    )
    story.append(
        entry(
            "Grammarly / Area Tech Lead, Grammarly Platform",
            "September 2022 - October 2025, Austin, remote",
            "Led Grammarly's platform organization before the company rebranded "
            "to Superhuman.",
        )
    )
    story.append(
        entry(
            "Grammarly / Engineering Manager, Grammarly for Developers",
            "September 2020 - September 2022 (2 years 1 month), Austin, remote",
            "With a PM partner led the team building Grammarly for Developers, "
            "Grammarly's new product and business line - from early prototypes, "
            "through public beta and GA launch in September 2022.",
        )
    )
    story.append(
        entry(
            "Grammarly / Engineering Manager, Identity and Data Platform teams",
            "September 2019 - September 2020 (1 year 1 month), San Francisco",
            "Switched to the engineering manager role. In addition to the Data "
            "Platform team, took on the charter and technical roadmap for the "
            "newly formed Identity team. Built identity foundations for Grammarly "
            "for Business (SSO, SAML, and basic RBAC) and Account Security pipelines "
            "for detecting and preventing credential stuffing attacks.",
        )
    )
    story.append(
        entry(
            "Grammarly / Technical Lead and later TLM, Data Platform",
            "July 2014 - August 2019 (5 years 2 months), San Francisco",
            "Started and grew the team that built Grammarly's in-house analytics "
            "and data pipeline capabilities. Enabled democratized data access "
            "through a custom SQL-based query language and powerful enrichment "
            "pipelines through a Scala-based DSL for dimension builders.",
        )
    )
    story.append(
        entry(
            "Amazon / Software Engineer, Kindle Community Workspace",
            "October 2013 - June 2014 (9 months), Seattle",
            "Built Goodreads integration with the Kindle ecosystem.",
        )
    )
    story.append(
        entry(
            "Pixonic / CTO",
            "March 2011 - September 2013 (2 years 7 months), Moscow",
            "Led work on AppMetr, an event-based analytics service for mobile and "
            "social games, and PixAPI Container, a client-server proxy API that "
            "generalized 18 social network and payment APIs.",
        )
    )
    story.append(
        entry(
            "Odnoklassniki.ru / Software Engineer",
            "July 2010 - March 2011 (9 months), Moscow",
            "Revamped the Groups feature in the second-largest social network in CIS.",
        )
    )
    story.append(
        entry(
            "Biletrix / Co-founder, CTO",
            "January 2010 - March 2011 (1 year 3 months), Moscow",
            "Built an early platform for selling concert and event tickets online "
            "for the local market.",
        )
    )
    story.append(
        entry(
            "KinoKrug / Co-founder, CTO",
            "September 2007 - March 2011 (3 years 7 months), Moscow",
            "Built a leading work-focused social network and online tools for the "
            "Russian media production market.",
        )
    )
    story.append(
        entry(
            "Netcracker / Software Engineer, System Performance",
            "September 2007 - March 2011 (3 years 7 months), Moscow",
            "Started part-time during college on a team tuning a large Java codebase "
            "and complex Oracle database deployments for performance and reliability.",
        )
    )
    story.append(
        entry(
            "Moscow Institute of Physics and Technology (MIPT)",
            "2002 - 2008",
            "Master and Bachelor in applied physics and mathematics.",
            "Education",
        )
    )

    doc.build(story, onFirstPage=footer, onLaterPages=footer)


if __name__ == "__main__":
    build()
