
const fs = require('fs');
const path = require('path');

const PROJECTS_JSON_PATH = path.join(__dirname, '../data/projects.json');
const ASSETS_DIR = path.join(__dirname, '../public/assets/projects');

// Helper to normalize strings for comparison
const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

function updateProjectImages() {
  const projects = JSON.parse(fs.readFileSync(PROJECTS_JSON_PATH, 'utf-8'));
  const assetFolders = fs.readdirSync(ASSETS_DIR).filter(item => {
    return fs.statSync(path.join(ASSETS_DIR, item)).isDirectory();
  });

  console.log(`Found ${projects.length} projects and ${assetFolders.length} asset folders.`);

  projects.forEach(project => {
    // Try to find a matching folder
    // Strategy: Match year + fuzzy name
    const projectYear = project.year;
    
    // Attempt to find potential matches starting with the year
    const potentialMatches = assetFolders.filter(folder => folder.startsWith(projectYear));
    
    let matchedFolder = null;
    
    if (potentialMatches.length > 0) {
      // Logic to find best match among potential matches
      // Simple heuristic: check if significant parts of the slug or title exist in the folder name
      
      const slugParts = project.slug.split('-');
      
      // Calculate a score for each potential match
      const scoredMatches = potentialMatches.map(folder => {
        let score = 0;
        const normalizedFolder = normalize(folder);
        
        // Boost if slug parts are present
        slugParts.forEach(part => {
             if (normalizedFolder.includes(normalize(part))) {
                 score += 1;
             }
        });

        // Boost for specific keywords from title
        const titleWords = project.title.toLowerCase().split(' ');
        titleWords.forEach(word => {
            if (word.length > 3 && normalizedFolder.includes(normalize(word))) {
                score += 2;
            }
        });

        return { folder, score };
      });
      
      // Sort by score desc
      scoredMatches.sort((a, b) => b.score - a.score);
      
      if (scoredMatches.length > 0 && scoredMatches[0].score > 0) {
        matchedFolder = scoredMatches[0].folder;
      }
    }

    if (matchedFolder) {
      console.log(`Matched "${project.title}" (${project.year}) -> ${matchedFolder}`);
      
      const folderPath = path.join(ASSETS_DIR, matchedFolder);
      const files = fs.readdirSync(folderPath);
      
      const galleryImages = [];
      const sliderImages = [];
      let coverImage = null; // Default to existing if not found

      files.forEach(file => {
        const lowerFile = file.toLowerCase();
        const webPath = `/assets/projects/${matchedFolder}/${file}`;
        
        if (lowerFile.startsWith('gallery')) {
          galleryImages.push(webPath);
        } else if (lowerFile.startsWith('slider')) {
          sliderImages.push(webPath);
        } else if (lowerFile.startsWith('main')) {
          coverImage = webPath;
        }
      });
        
      // Natural sort for images (gallery (1), gallery (2)...)
      const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
      galleryImages.sort(collator.compare);
      sliderImages.sort(collator.compare);

      // Update project
      if (coverImage) {
          project.coverImage = coverImage;
          project.images = [coverImage]; // Legacy array update
      }
      
      project.galleryImages = galleryImages;
      project.sliderImages = sliderImages;

    } else {
      console.warn(`No matching folder found for "${project.title}" (${project.year})`);
    }
  });

  fs.writeFileSync(PROJECTS_JSON_PATH, JSON.stringify(projects, null, 2));
  console.log('Updated projects.json successfully.');
}

updateProjectImages();
