/**
 * AI Story Generator – Template-based narrative engine
 * Generates rich, varied chapter narratives for each person entry
 */

const ROLE_TITLES = {
  friend: ['The Kindred Spirit', 'The Companion', 'The Confidant', 'A Friend Like No Other', 'Bonds Unbroken'],
  mentor: ['The Guiding Light', 'The Mentor', 'Wisdom Bestowed', 'The Teacher Within', 'Lessons in Living'],
  lesson: ['The Unexpected Teacher', 'The Lesson', 'Through the Storm', 'Forged in Fire', 'A Difficult Grace'],
  family: ['Blood and Beyond', 'The Foundation', 'Roots and Wings', 'Where It All Began', 'Heart of Home'],
  partner: ['Two Souls Aligned', 'The Other Half', 'Love\'s Architecture', 'A Shared Horizon', 'Together'],
  colleague: ['The Professional Bond', 'Side by Side', 'In the Trenches', 'The Collaborator', 'Shared Purpose'],
  stranger: ['The Passing Light', 'A Moment\'s Gift', 'The Unknown Angel', 'Crossing Paths', 'Brief but Eternal'],
  rival: ['The Mirror', 'The Challenger', 'Sharpened by Opposition', 'A Worthy Rival', 'The Other Side'],
  inspiration: ['The Spark', 'A Light in the Distance', 'The Catalyst', 'Ignition', 'The Flame Within']
};

const DEFAULT_TITLES = ['A Chapter Remembered', 'An Indelible Mark', 'The Story Within', 'Pages of the Heart', 'Written in Life'];

// ── CASUAL STYLE ──────────────────────────────────────────────
function generateCasual(person) {
  const openers = [
    `You know how some people just walk into your life and everything shifts? That's exactly what happened with ${person.name}.`,
    `If I had to pick one person who really left a mark, it would be ${person.name}. No question.`,
    `There are people you meet and forget, and then there's ${person.name}. Completely unforgettable.`,
    `I didn't know it at the time, but meeting ${person.name} was one of those moments that changes everything.`,
    `Some stories start with a bang. Mine with ${person.name}? It started with something much more real.`
  ];

  const middles = [
    `As a ${person.role} in my life, ${person.name} brought something I didn't even know I was missing. ${person.memory} — that's the kind of thing that stays with you, you know? Not in a dramatic, movie-scene way, but in the quiet way that reshapes how you see the world.`,
    `Being my ${person.role}, ${person.name} had this way of making the ordinary feel significant. ${person.memory}. Looking back, I realize those moments were building blocks — tiny bricks in the foundation of who I'd become.`,
    `What made ${person.name} special as a ${person.role} wasn't anything flashy. It was the consistency, the presence. ${person.memory}. And somehow, that was more than enough to change the course of things.`,
    `${person.name} wasn't trying to be profound — they were just being themselves. But as my ${person.role}, that authenticity was the most powerful thing. ${person.memory}. It's funny how the most real moments are the ones that stick.`
  ];

  const closers = [
    `I carry ${person.name} with me in ways I'm still discovering. Some people don't just pass through your life — they become part of your story's DNA.`,
    `Even now, I catch myself thinking about what ${person.name} would say, what they would do. That's the mark of someone who truly mattered.`,
    `Life keeps moving, chapters keep turning, but the pages with ${person.name}? Those are the ones I keep coming back to, dog-eared and highlighted.`,
    `The best thing about having ${person.name} in my story? Knowing that some connections aren't bound by time or distance. They just are.`
  ];

  return `${pick(openers)}\n\n${pick(middles)}\n\n${pick(closers)}`;
}

// ── POETIC STYLE ──────────────────────────────────────────────
function generatePoetic(person) {
  const openers = [
    `In the vast anthology of days lived and yet to live, there exists a chapter illuminated by the presence of ${person.name} — a verse written not in ink, but in the language of becoming.`,
    `Some souls arrive like seasons — not announced, but felt. ${person.name} entered the narrative of my existence like autumn enters a forest: transforming everything with quiet, breathtaking inevitability.`,
    `There is a place in memory where light bends differently, where time pools like honey. That is where I keep the story of ${person.name}.`,
    `If life is a poem, then ${person.name} is the stanza where the meter shifts — where the ordinary syllables of existence suddenly find their rhythm.`
  ];

  const middles = [
    `As ${person.role}, ${person.name} wove threads of meaning into the fabric of my days. ${person.memory} — a moment suspended in amber, forever catching the light at just the right angle. It was not merely an event, but a revelation dressed in the clothes of the everyday.`,
    `In their role as ${person.role}, ${person.name} did not simply exist alongside me — they altered the very atmosphere. ${person.memory}. Like a stone cast into still water, the ripples of that moment are still expanding, still touching shores I have yet to reach.`,
    `${person.name}, my ${person.role}, carried a quiet radiance — the kind that doesn't blind but illuminates. ${person.memory}. In that crystalline moment, I understood that some truths cannot be spoken; they can only be lived, only be felt in the marrow of shared experience.`,
    `What is a ${person.role} but someone who teaches you the grammar of your own heart? ${person.name} did precisely that. ${person.memory} — and in that unfolding, I discovered paragraphs of myself I had never dared to read aloud.`
  ];

  const closers = [
    `And so ${person.name} remains — not as a memory fading at the edges, but as a living verse in the poem I am still writing. Some stanzas, once composed, become eternal.`,
    `The chapter of ${person.name} does not end. It echoes through every subsequent page, a harmonic that enriches every note that follows. This is the nature of souls that truly touch us — they become the music beneath the melody.`,
    `In the cathedral of remembrance, ${person.name} occupies a stained-glass window — light forever streaming through in colors I could never have imagined alone.`,
    `Time will turn its pages, seasons will revise their drafts, but the poetry of ${person.name} endures — immutable, luminous, forever woven into the tapestry of who I am becoming.`
  ];

  return `${pick(openers)}\n\n${pick(middles)}\n\n${pick(closers)}`;
}

// ── INSPIRATIONAL STYLE ──────────────────────────────────────
function generateInspirational(person) {
  const openers = [
    `Every great journey has its defining encounters — those pivotal moments when someone appears and challenges you to become more than you thought possible. For me, that someone was ${person.name}.`,
    `They say we are the sum of the people who shape us. If that's true, then ${person.name} added something extraordinary to my equation — something that changed everything.`,
    `In the blueprint of my life, ${person.name} is not just a name. They are a turning point, a catalyst, proof that one person can ignite a transformation.`,
    `The most powerful forces in life aren't always the loudest. ${person.name} proved that with a presence that was both subtle and seismic.`
  ];

  const middles = [
    `As my ${person.role}, ${person.name} didn't just occupy space in my life — they expanded it. ${person.memory}. That experience became a cornerstone, a proof of concept that we are all capable of profound growth when the right person believes in us at the right time.`,
    `What ${person.name} brought as a ${person.role} was more than guidance — it was permission. Permission to dream bigger, to fail forward, to embrace the messy, beautiful process of becoming. ${person.memory}. In that moment, limitations I'd accepted as permanent suddenly became negotiable.`,
    `${person.name}'s role as my ${person.role} taught me something textbooks never could: that real strength isn't about never falling — it's about who's there when you do. ${person.memory}. That single experience reshaped my understanding of resilience, of what it means to truly show up for another person.`,
    `There's a before and after with ${person.name}. Before — smaller dreams, fewer possibilities. After — a wider horizon, a deeper well of courage. As my ${person.role}, they showed me this: ${person.memory}. And nothing was ever quite the same.`
  ];

  const closers = [
    `${person.name}'s impact isn't measured in moments — it's measured in the person I continue to become because of them. That is the greatest gift anyone can give: not answers, but the courage to keep asking questions.`,
    `We don't always get to choose our chapters, but we can choose to honor them. ${person.name} is a chapter I will carry with pride — a testament to the power of human connection, purpose, and unwavering belief.`,
    `If my life is a story of growth, then ${person.name} is the chapter where the roots went deepest. And from those roots, everything else has been able to reach toward the light.`,
    `The fire that ${person.name} lit inside me still burns. Not with the same flame, but with the same warmth — reminding me, every single day, of what's possible when one person decides to make a difference.`
  ];

  return `${pick(openers)}\n\n${pick(middles)}\n\n${pick(closers)}`;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getTitle(role) {
  const titles = ROLE_TITLES[role?.toLowerCase()] || DEFAULT_TITLES;
  return pick(titles);
}

function generateChapter(person, style = 'casual') {
  const title = getTitle(person.role);
  let narrative;

  switch (style) {
    case 'poetic':
      narrative = generatePoetic(person);
      break;
    case 'inspirational':
      narrative = generateInspirational(person);
      break;
    case 'casual':
    default:
      narrative = generateCasual(person);
      break;
  }

  return { title, narrative, style };
}

function generateSceneTitle(person, scene, index) {
  const titles = [
    'The First Encounter', 'A Moment of Grace', 'Through the Storm', 
    'The Turning Point', 'A Lesson Learned', 'The Quiet Revelation',
    'Bonds that Bind', 'A New Perspective', 'The Heart of the Matter',
    'A Legacy Shared', 'The Final Word', 'Echoes of Memory'
  ];
  
  // Try to pick a title based on keywords in the scene
  const keywords = {
    meet: ['The First Encounter', 'Crossing Paths', 'The Beginning'],
    challeng: ['Through the Storm', 'The Hardest Lesson', 'Forged in Fire'],
    teach: ['The Lesson Learned', 'Wisdom Gained', 'The Teacher Within'],
    laugh: ['Moments of Joy', 'Laughter and Light', 'The Shared Smile'],
    sad: ['The Heavy Heart', 'A Bittersweet Note', 'Grace in Loss'],
    end: ['The Final Word', 'A Legacy Shared', 'Sunset Reflections']
  };

  const lowerScene = scene.toLowerCase();
  for (const [key, options] of Object.entries(keywords)) {
    if (lowerScene.includes(key)) return pick(options);
  }

  return titles[index % titles.length];
}

function enhanceScene(person, scene, style) {
  // A simplified version of the style engines for specific scene text
  const sceneText = scene.trim();
  
  const intros = {
    casual: [`When I think about this part of the story, ${person.name} really stands out.`, `This moment with ${person.name} was something else.`, `So, here's where it gets interesting with ${person.name}.`],
    poetic: [`In the tapestry of our shared time, this thread glows with a particular light. ${person.name} was there, a presence both felt and seen.`, `There are seconds that stretch into hours, and this was one of them, with ${person.name} as the anchor.`, `Let the memory of ${person.name} settle like morning mist over these words.`],
    inspirational: [`Growth rarely happens in a vacuum; it happens in moments like this, with people like ${person.name}.`, `The true measure of ${person.name}'s influence can be found in this very chapter.`, `If you want to understand the impact ${person.name} had, you have to look here.`]
  };

  const conclusions = {
    casual: [`Looking back, that was exactly what I needed.`, `It’s funny how those small things ending up being the big things with ${person.name}.`, `I wouldn't trade that memory for anything.`],
    poetic: [`And so the ink dries on this page, but the feeling remains — eternal and iridescent.`, `In the silence that followed, I could still hear the echo of ${person.name}'s voice.`, `Such is the poetry of a life lived alongside ${person.name}.`],
    inspirational: [`That was the day I realized that ${person.name} wasn't just a part of my story — they were helping me write it.`, `We are forged in these moments, and I am better for having known ${person.name}.`, `The journey continued, but the lesson stayed firmly rooted.`]
  };

  const intro = pick(intros[style] || intros.casual);
  const outro = pick(conclusions[style] || conclusions.casual);

  return `${intro}\n\n${sceneText}\n\n${outro}`;
}

function expandDeepDive(person, storyText, style = 'casual') {
  // Split by double newlines to get paragraphs/scenes
  let scenes = storyText.split(/\n\s*\n/).filter(s => s.trim().length > 20);
  
  if (scenes.length === 0 && storyText.trim().length > 0) {
    // If no double newlines, try splitting by sentences and grouping
    const sentences = storyText.match(/[^.!?]+[.!?]+/g) || [storyText];
    scenes = [];
    // Group into 2-3 sentences per scene to create a multi-chapter feel
    for (let i = 0; i < sentences.length; i += 3) {
      scenes.push(sentences.slice(i, i + 3).join(' '));
    }
  }

  // Limit to max 10 chapters for stability
  scenes = scenes.slice(0, 10);

  const chapters = scenes.map((scene, index) => {
    const title = generateSceneTitle(person, scene, index);
    const narrative = enhanceScene(person, scene, style);
    return { title, narrative, style };
  });

  return chapters;
}

module.exports = { generateChapter, expandDeepDive };
