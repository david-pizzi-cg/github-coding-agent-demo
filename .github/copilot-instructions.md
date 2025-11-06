# GitHub Coding Agent Demo Project - AI Instructions

## Project Purpose

This is an **alternative demonstration project** for GitHub Coding Agent integration, building upon the original GitHub MCP Server concept. The primary goal is showcasing **prompt-driven AI assignment** for automated DevOps workflows through a deliberately broken World Clock web app.

## Critical Architecture Understanding

### Demo-Specific Bug Pattern

- **Intentional Bug**: Line 7 in `index.html` has `href="styls.css"` (missing 'e')
- **Purpose**: Creates visually obvious CSS failure for demonstration
- **Fix**: Change to `href="styles.css"`
- **Impact**: Without fix, page appears completely unstyled

### Core Components

- `index.html`: Single-page World Clock app (contains demo bug)
- `styles.css`: Modern CSS with CSS Grid layout and CSS custom properties
- `script.js`: ES6 class-based WorldClock with timezone handling via `Intl` API
- `.vscode/mcp.json`: MCP server configuration for GitHub integration

## Alternative Development Workflow (GitHub Coding Agent)

### Traditional vs Alternative Workflow

**Original Demo**: Human + MCP Tools for all phases  
**Alternative Demo**: Human discovery → GitHub Coding Agent automation (phases 3-5)

### GitHub Coding Agent Workflow Demonstration

When assisting with this project, follow this **7-phase demo sequence**:

**Phase 0: Pre-Demo Setup** (Human + AI)
- Human prompts AI to create demo branch from main using `mcp_github_create_branch`
- Switch to demo branch locally for development context

**Phase 1: Issue Discovery** (Human + AI)
- Human reports styling issues via natural language prompt
- AI analyzes HTML file and identifies CSS link typo in line 7
- AI explains root cause and impact of `href="styls.css"` missing 'e'

**Phase 2: Issue Management** (Human + AI)
- Human prompts AI to create GitHub issue using `mcp_github_issue_write`
- AI creates issue with labels: `bug`, `critical`, `styling`
- Issue references demo branch and requests fix from demo branch base

**Phase 3: GitHub Coding Agent Assignment** (Human Choice)
- **CRITICAL LIMITATION**: MCP tools (`mcp_github_assign_copilot_to_issue`) cannot specify base branch
- **Consequence**: MCP assignment defaults to main branch, breaking demo workflow
- **Solution**: Manual UI assignment (user clicks GitHub interface to select demo branch)

**Phase 4-5: Automated Development & Integration** (GitHub Coding Agent)
- Agent creates branch from demo branch (if manual UI assignment specifies demo branch) or main (if defaults)
- Agent fixes `href="styls.css"` → `href="styles.css"` in `index.html` line 7
- Agent creates PR with proper linking and documentation
- Agent performs self-review and status updates

**Phase 6: Completion** (Human + AI) 
- Human prompts AI to merge PR using `mcp_github_merge_pull_request`
- AI handles branch cleanup and issue closure

**Phase 7: Post-Demo Cleanup** (Human + AI)
- Human prompts AI to delete demo branch locally and remotely
- Return to main branch

### GitHub Coding Agent Capabilities to Highlight

#### Autonomous Development Features:

- **Code Analysis**: Automatically identifies root cause of CSS linking issue
- **Fix Implementation**: Corrects typo without human intervention
- **Quality Validation**: Tests fix to ensure styling loads correctly
- **Best Practices**: Follows proper commit message and PR description conventions

#### Advanced Integration Features:

- **Branch Management**: Creates appropriately named hotfix branches
- **Issue Linking**: Automatically links PRs to issues using "Fixes #" syntax
- **Documentation**: Generates comprehensive PR descriptions and commit messages
- **Self-Review**: Provides detailed code review comments explaining the fix

#### Workflow Automation Features:

- **Status Updates**: Comments on issues with progress updates
- **Error Handling**: Gracefully handles edge cases and provides clear error messages
- **Validation**: Runs appropriate tests and checks before submitting PRs
- **Cleanup**: Suggests or handles branch cleanup after merging

### Testing Approach

- **Local Development**: Use Live Server extension for immediate visual feedback
- **Visual Validation**: Compare styled vs unstyled page appearance
- **Automated Testing**: GitHub Coding Agent should validate the fix works
- **No Unit Tests Required**: This is a demo project, visual verification is sufficient

## Code Patterns & Conventions

### JavaScript Architecture

- **Class-based**: Single `WorldClock` class in `script.js`
- **Async/Await**: All time operations use modern async patterns
- **No External APIs**: Uses browser `Intl` API and `Date` objects (CORS-free)
- **Global Exposure**: `window.WorldClock = WorldClock` for potential extension

### CSS Patterns

- **CSS Custom Properties**: All colors/spacing defined in `:root`
- **CSS Grid**: `.additional-info` uses auto-fit grid for responsive 4-panel layout
- **Modern Animations**: `@keyframes` for fadeIn effects, `transform` for hover states
- **Mobile-First**: Responsive breakpoints at 768px and 480px

### HTML Structure

- **Semantic HTML**: Proper `header`, `main`, `footer` structure
- **BEM-like Classes**: `.clock-container`, `.info-card`, `.info-value` pattern
- **Accessibility**: Proper heading hierarchy, meaningful alt text

## GitHub Coding Agent Integration Points

### Assignment Mechanism

- **Branch Limitation**: Current MCP tools cannot specify base branch (defaults to main)
- **Assignment Solution**: Manual UI assignment via GitHub web interface with branch selection
- **Task Clarity**: Issues should clearly describe the problem and expected outcome
- **Context Provision**: Include file names, line numbers, and error descriptions

### Agent Automation Expectations

- **Branch Creation**: Agent should create descriptive branch names
- **Code Quality**: Agent should follow project conventions and best practices
- **Communication**: Agent should provide clear updates and explanations
- **Testing**: Agent should validate fixes before submitting PRs

### Human Oversight Points

- **Initial Discovery**: Human identifies and reports the issue
- **Assignment Decision**: Human chooses when to involve GitHub Coding Agent
- **Final Approval**: Human reviews and approves agent's work
- **Merge Control**: Human maintains control over final merge decisions

## Key Demo Talking Points

When explaining this enhanced project to others:

- Emphasize **GitHub Coding Agent autonomy** in handling complex workflows
- Highlight **speed and consistency** of automated development
- Show **seamless handoff** between human and AI responsibilities
- Demonstrate **quality assurance** through automated testing and validation
- Showcase **comprehensive documentation** generated by the agent

### Advanced Features to Demonstrate:

- **Intelligent Problem Analysis**: Agent understands CSS linking issues
- **Contextual Fixes**: Agent makes precise, minimal changes
- **Workflow Integration**: Agent follows proper Git and GitHub conventions
- **Communication Skills**: Agent provides clear updates and explanations
- **Quality Assurance**: Agent validates fixes before submission

## Integration Benefits Over Original Demo

### Efficiency Gains:

- **Time Reduction**: Phases 3-5 happen automatically without human intervention
- **Consistency**: Agent follows same high-quality practices every time
- **Error Reduction**: Less human error in manual Git operations
- **Parallel Processing**: Agent can handle multiple aspects simultaneously

### Quality Improvements:

- **Comprehensive Testing**: Agent validates fixes more thoroughly
- **Better Documentation**: Agent generates detailed PR descriptions
- **Code Review**: Agent provides self-review with explanations
- **Best Practices**: Agent consistently follows development conventions

### Learning Opportunities:

- **AI Collaboration**: Shows effective human-AI partnership patterns
- **Workflow Automation**: Demonstrates advanced DevOps automation
- **Quality Gates**: Shows how AI can maintain development standards
- **Communication**: Demonstrates AI's ability to document and explain work

## DO NOT

- Add build tools, package.json, or complex dependencies
- Create actual unit tests (demo focuses on visual verification)
- Remove the intentional bug without going through proper workflow
- Add production-ready features that complicate the demo
- Override GitHub Coding Agent's autonomous decision-making in phases 3-5

## GitHub Coding Agent Guidance

When this project is assigned to GitHub Coding Agent, the agent should:

1. **Analyze the Issue**: Understand that this is a CSS linking problem
2. **Create Branch**: Use naming convention like `copilot/fix-css-stylesheet-typo` or similar descriptive name
3. **Implement Fix**: Change `href="styls.css"` to `href="styles.css"` in line 7 of `index.html`
4. **Validate Fix**: Ensure the change resolves the styling issue
5. **Create PR**: Include "Fixes issue" reference with actual issue number for auto-linking
6. **Document Work**: Provide comprehensive PR description explaining the fix
7. **Self-Review**: Add review comments explaining the change and its impact
8. **Update Issue**: Comment on issue with progress and completion status

The agent should maintain the demo's educational value while showcasing advanced AI development capabilities.
