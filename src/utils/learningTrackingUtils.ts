
/**
 * Utility functions for SCORM and xAPI tracking integrations
 */

// Define proper type for XAPIWrapper
interface XAPIWrapper {
  changeConfig: (config: {endpoint?: string, auth?: string}) => void;
  sendStatement: (statement: any) => void;
}

// Define global interfaces for SCORM APIs
declare global {
  interface Window {
    ADL?: {
      XAPIWrapper: XAPIWrapper;
    };
    // SCORM 2004 API
    API_1484_11?: any;
    // SCORM 1.2 API
    API?: any;
  }
}

/**
 * Loads the xAPI (TinCan) library dynamically
 * @param endpoint The LRS endpoint URL
 * @param auth Authentication string for the LRS
 * @returns Promise that resolves when the library is loaded
 */
export const loadXAPI = (endpoint?: string, auth?: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.ADL && window.ADL.XAPIWrapper) {
      console.log("xAPI already loaded");
      
      // Configure with provided endpoint if available
      if (endpoint && auth) {
        window.ADL.XAPIWrapper.changeConfig({
          endpoint,
          auth
        });
      }
      
      resolve();
      return;
    }
    
    // Dynamically load the xAPI library
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/xAPIWrapper/1.10.0/xapiwrapper.min.js";
    script.async = true;
    script.onload = () => {
      console.log("xAPI library loaded");
      
      // Configure with provided endpoint if available
      if (window.ADL && window.ADL.XAPIWrapper && endpoint && auth) {
        window.ADL.XAPIWrapper.changeConfig({
          endpoint,
          auth
        });
      }
      
      resolve();
    };
    script.onerror = () => {
      console.error("Failed to load xAPI library");
      reject(new Error("Failed to load xAPI library"));
    };
    
    document.body.appendChild(script);
  });
};

/**
 * Checks if a SCORM API is available in the window or parent windows
 * Useful for determining if we're running in an LMS
 * @returns True if SCORM API is found
 */
export const detectSCORMAPI = (): boolean => {
  try {
    let win: Window | null = window;
    let findAttempts = 0;
    
    // Search up to 5 parent levels
    while (win && findAttempts < 5) {
      // Check for SCORM 2004
      if (win.API_1484_11) {
        return true;
      }
      
      // Check for SCORM 1.2
      if (win.API) {
        return true;
      }
      
      // Move to parent window if we're in an iframe
      if (win.parent && win.parent !== win) {
        win = win.parent as Window;
      } else {
        break;
      }
      
      findAttempts++;
    }
    
    return false;
  } catch (e) {
    console.error("Error detecting SCORM API:", e);
    return false;
  }
};

/**
 * Creates a WCAG-compliant keyboard handler for interactive elements
 * @param onClick The click handler to call
 * @returns A keyboard event handler
 */
export const createKeyboardHandler = (onClick: () => void) => {
  return (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };
};

/**
 * Check if we're running in a SCORM environment (i.e., inside an LMS)
 */
export const isInSCORMEnvironment = detectSCORMAPI();
